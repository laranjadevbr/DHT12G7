const elements = require('./vars');
const {
    check,
    validationResult,
    body,
} = require('express-validator');
const fs = require('fs');
const path = require('path');
const JSONpath = path.join('data', 'items.json');
const JSONitems = JSON.parse(fs.readFileSync(JSONpath, {
    encoding : 'utf-8'
}));
const bcrypt = require('bcrypt');
const { url } = require('inspector');
const controllers = {
    index : (req, res) => {
        let title = 'index';
        return res.render('index', { title : title });
    },
    create : (req, res) => {
        let title = 'create new user.';
        let form = {
            action : '/create',
            enctype : 'multipart/form-data',
            method : 'POST',
        };
        return res.render('create', {
            title : title,
            form : form,
            elements : elements,
        });
    },
    save : (req, res) => {
        let title = 'data sent successfully!';
        let form = {
            action : '/create',
            enctype : 'multipart/form-data',
            method : 'POST',
        };
        let errorslist = validationResult(req);
        if(errorslist.isEmpty()) {
            let { fullname, email, password } = req.body;
            let { files } = req;
            let archive = files.length == 0 ? null : files[0].originalname;
            let hash = bcrypt.hashSync(password, 10);
            let JSONitems = JSON.stringify([{ fullname, email, password : hash, archive : archive }]);
            fs.writeFileSync(JSONpath, JSONitems);
            return res.render('create', {
                title : title,
                form : form,
                elements : elements
            });
        } else {
            return res.render('create', { title: title, form : form, elements : elements, errors : errorslist.errors });
        }
    },
    edit : (req, res) => {
        let title = 'edit (' + JSONitems[req.params.id].fullname + ')´s registration.';
        let form = {
            action : '/edited?_method=PUT',
            // enctype : 'multipart/form-data',
            method : 'POST',
        };
        res.render('create', { title : title, form : form, elements : elements, values : JSONitems[req.params.id] });
    },
    edited : (req, res) => {
        let title = 'the registration was edited for (' + req.body.fullname + ').';
        res.render('index', { title: title });
    },
    list : (req, res) => {
        let title = 'itens list.';
        res.render('list', {
            title : title,
            values : JSONitems,
            user : req.session.user
        });
    },
    delete : (req, res) => {
        let title = 'The user (' + JSONitems[req.params.id].fullname + ') has been deleted.';
        res.render('index', { title : title });
    },
    log : (req, res) => {
        let title = 'access panel.';
        let form = {
            action : '/log',
            // enctype : 'multipart/form-data',
            method : 'POST',
        };
        if(req.cookies.checkbox == JSONitems[0].email) {
            req.session.user = JSONitems;
            return res.redirect('/list');
        } else {
            console.log();
            res.render('log', { title : title, form : form, elements : elements });
        }
    },
    login : (req, res) => {
        let { email, password, checkbox } = req.body;
        if (email !== JSONitems[0].email) {
            let title = 'Invalid e-mail!';
            return res.render('index', { title : title });
        }
        if (!bcrypt.compareSync(password, JSONitems[0].password)) {
            let title = 'Invalid password!';
            return res.render('index', { title : title });
        }
        req.session.user = JSONitems;
        if (typeof checkbox != 'undefined') {
            let timer = 600000;
            res.cookie('checkbox', JSONitems[0].email, { maxAge : timer });
            res.cookie('checkbox', JSONitems[0].password, { maxAge : timer });
        }
        return res.redirect('/list');
    },
    // query : (req, res) => {
    //     http://localhost:3000/contact?name=fabio&age=38
    //     let { name, age } = req.query;
    //     return res.send('Ola ' + name + ' de ' + age + ' anos.');
    //     let title = (name && age) ? 'Ola ' + name + ' de ' + age + ' anos!' : null;
    // }
    // body : (req, res) => {
        // console.log(req.body);
        // let { name, email } = req.body;
        // res.send('E-mail (' + email + ') de (' + name + ') recebido com sucesso!');
    // }
    // number : (req, res) => {
    //     let { number } = req.params;
    //     res.render('index', { title: number });
    // }
};
module.exports = controllers;