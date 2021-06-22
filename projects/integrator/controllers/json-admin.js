const {
    forms : {
        public : {
            create,
            edit,
            view,
            login,
        },
    },
    names : {
        public : item,
    },
} = require('../database/elements');
const {
    inputType : inputType,
} = option = require('../database/options');
const dataBase = require('../database/json/clients');
const prefix = '/json/admin/';
const {
    forEveryone,
    getFormHeader,
    getHash,
    getPageTitle,
    getScript,
    getURLPath,
    getViewName,
    JSONModify,
    JSONPagination,
} = require('../utils');
module.exports = {
    index : (req, res, next) => {
    },
    all : (req, res, next) => {
        const amount = 2;
        const allNames = 'all';
        const { page = 1 } = req['query'];
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
            index : JSONPagination({
                array : dataBase,
                limit : amount,
                offset : page,
            })['listPage'],
            item : item,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            pathPrefix : getViewName(prefix),
            script : getScript(allNames),
            ...forEveryone(),
            ...JSONPagination({
                array : dataBase,
                limit : amount,
                offset : page,
            }),
        });
    },
    one : (req, res, next) => {
        const allNames = 'one';
        const { id } = req['params'];
        const index = dataBase.find((index) => {
            return index['id'] == id;
        });
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
            btnTitle : 'come back',
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            script : getScript(allNames),
            ...forEveryone(),
            ...getFormHeader({
                prefix : prefix,
                suffix : 'all',
                enctype : '',
                method : 'POST',
            }),
        });
    },
    create : (req, res, next) => {
        const allNames = 'create';
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            script : getScript(allNames),
            ...forEveryone(),
            ...getFormHeader({
                prefix : prefix,
                suffix : 'save',
                enctype : '',
                method : 'POST',
            }),
        });
    },
    edit : (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = dataBase.find((index) => {
            return index['id'] == id;
        });
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            script : getScript(allNames),
            ...forEveryone(),
            ...getFormHeader({
                prefix : prefix,
                suffix : 'update' + '/' + id,
                enctype : '',
                method : 'POST',
            }),
        });
    },
    store : (req, res, next) => {
        req['body']['password'] = getHash(req['body']['password']);
        const index = {
            active : true,
            id : dataBase[dataBase['length'] - 1]['id'] + 1,
            ...req['body'],
        };
        dataBase.push(index);
        JSONModify({
            name : 'clients',
            content : dataBase,
            path : 'database/json/clients.js',
        });
        return res.send(index);
    },
    update : (req, res, next) => {
    },
    destroy : (req, res, next) => {
        const { id } = req['params'];
        const index = dataBase.filter((index) => {
            return index['id'] !== id;
        });
        JSONModify({
            name : 'clients',
            content : index,
            path : 'database/json/clients.js',
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'view',
        }));
    },
    search : async (req, res, next) => {
    },
    login : async (req, res, next) => {
    },
    logout : async (req, res, next) => {
    },
    authenticate : async (req, res, next) => {
    },
};