const {
    form : {
        public : {
            create,
            edit,
            view,
            login,
        }
    },
    name : {
        public : item,
    }
} = require('../database/elements');
const {
    inputType : inputType,
} = option = require('../database/options');
const bcrypt = require('bcrypt');
const currentList = require('../database/json/clients');
const jsonVariable = 'clients';
const jsonArchive = jsonVariable + '.js';
const jsonFolder = 'database';
const prefix = '/json/client/';
const {
    capitalize,
    cleaner,
    currency,
    dismember,
    getCNPJ,
    getCPF,
    getNumber,
    getPhone,
    getRandomDate,
    getRandomInt,
    navbar,
    onlyNumbers,
    pageTitle,
    plural,
    readjust,
    roman,
    saver,
    script,
    urlPath,
    validate,
    viewName,
} = require('../utils');
const session = (req, res, next) => {
    return req.session.user;
};
module.exports = {
    index : (req, res, next) => {
    },
    all : (req, res, next) => {
        const { page = 1 } = req['query'];
        const {
            full : fullPage,
            list : listPage,
            next : nextPage,
            prev : prevPage
        } = navbar(page, 2, currentList);
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : listPage,
            item : item,
            inputType : inputType,
            nextPage : nextPage,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            prevPage : prevPage,
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    one : (req, res, next) => {
        const { id } = req['params'];
        const index = currentList.find((index) => {
            return index['id'] == id;
        });
        const allNames = 'one';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'all'),
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'come back',
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    create : (req, res, next) => {
        const allNames = 'create';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'save'),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    edit : (req, res, next) => {
        const { id } = req.params;
        const index = currentList.find((index) => {
            return index['id'] == id;
        });
        const allNames = 'edit';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'update') + '/' + id,
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    store : (req, res, next) => {
        req['body']['password'] = bcrypt.hashSync(req['body']['password'], bcrypt.genSaltSync(10));
        const index = {
            active : true,
            id : Number(currentList[currentList['length'] - 1]['id']) + 1,
            ...req.body
        };
        currentList.push(index);
        saver(currentList, jsonVariable, jsonFolder, jsonArchive);
        return res.send(index);
    },
    update : (req, res, next) => {
    },
    destroy : (req, res, next) => {
        const { id } = req.params;
        const index = currentList.filter((index) => {
            return index['id'] !== id;
        });
        saver(index, jsonVariable, jsonFolder, jsonArchive);
        return res.redirect(urlPath(prefix, 'view'));
    },
    login : (req, res, next) => {
        const allNames = 'login';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'authenticate'),
                enctype : '',
                method : 'POST',
            },            
            btnTitle : allNames,
            formElement : login,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    logout : (req, res, next) => {
        session.destroy();
        return res.redirect(urlPath(prefix, 'login'));
    },
    authenticate : (req, res, next) => {
        const {
            email,
            password
        } = req['body'];
        const index = currentList.find((index) => {
            return index['email'] == email;
        });
        const allNames = 'save';
        if (!validate(index)) {
            return res.render(viewName(prefix, allNames), {
                form : {
                    action : urlPath(prefix, 'authenticate'),
                    enctype : '',
                    method : 'POST',
                },
                formElement : create,
                inputType : inputType,
                notfound : true,
                pageTitle : pageTitle(prefix, allNames),
                capitalize,
                cleaner,
                currency,
                roman,
                validate,
                session,
            });
        }
        if (!bcrypt.compareSync(password, currentList['password'])) {
            return res.render(viewName(prefix, allNames), {
                form : {
                    action : urlPath(prefix, 'authenticate'),
                    enctype : '',
                    method : 'POST',
                },
                formElement : create,
                inputType : inputType,
                notfound : true,
                pageTitle : pageTitle(prefix, allNames),
                capitalize,
                cleaner,
                currency,
                roman,
                session,
                validate,
            });
        }
        const {
            password : pass,
            ...without
        } = currentList; 
        req.session.clients = without;
        allNames = 'list';
        return res.render(viewName(prefix, allNames), {
            pageTitle : pageTitle(prefix, allNames),
            session,
        });
    },
};