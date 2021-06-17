const fs = require('fs');
const path = require('path');
const middlewares = {
    urllog : (req, res, next) => {
        let string = 'access = url => ( ' + req.url + ' ); ';
        fs.appendFileSync(path.join('logs', 'urllog.txt'), string);
        console.log(string);
        next();
    },
    dblog : (req, res, next) => {
        let string = 'record created = url => ( ' + req.url + ' ); ';
        fs.appendFileSync(path.join('logs', 'dblog.txt'), string);
        console.log(string);
        next();
    },
    author : (req, res, next) => {
        let title = 'You must be logged in to access this page.';
        return typeof req.session.user != undefined ? next() : res.render('index', { title : title });
    },
    cookie : (req, res, next) => {
        let user = JSON.parse(fs.readFileSync(path.join('data', 'items.json'), { encoding : 'utf-8' }));
        if(req.cookies.checkbox == user[0].email) {
            req.session.user = user;
        }
        return next();
    },
}
module.exports = middlewares;