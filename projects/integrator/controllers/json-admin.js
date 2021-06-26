const dataBase = require('../database/json/clients');
const {
    everyoneView,
    getFormHeader,
    getHash,
    getScript,
    getURLPath,
    JSONModify,
    JSONPagination,
} = require('../utils');
let {
    getIndex,
} = require('../utils/actions/json');
module.exports = {
    index : (req, res, next) => {
    },
    all : (req, res, next) => {
        const { page = 1 } = req['query'];
        return res.render('menu', {
            index : JSONPagination({
                array : dataBase,
                limit : 2,
                offset : page,
            })['listPage'],
            item : require('../database/elements')['name']['public'],
            pageTitle : ('json-admin').split('-').join(' ') + ' all',
            pathPrefix : ('json-admin').split('-').join('/'),
            script : getScript('all'),
            ...everyoneView(),
            ...JSONPagination({
                array : dataBase,
                limit : 2,
                offset : page,
            }),
        });
    },
    one : (req, res, next) => {
        const { id } = req['params'];
        const index = dataBase.find((index) => {
            return index['id'] == id;
        });
        return res.render('form', {
            btnTitle : 'come back',
            formElement : require('../database/elements')['form']['public']['view'],
            index : index,
            inputType : require('../database/options')['inputType'],
            pageTitle : ('json-admin').split('-').join(' ') + ' one',
            script : getScript('one'),
            ...everyoneView(),
            ...getFormHeader({
                prefix : 'json-admin',
                suffix : 'one',
                enctype : '',
                method : 'POST',
            }),
        });
    },

    create : (req, res, next) => {
        return res.render('form', {
            btnTitle : 'create',
            formElement : require('../database/elements')['form']['public']['create'],
            inputType : require('../database/options')['inputType'],
            pageTitle : ('json-admin').split('-').join(' ') + ' create',
            script : getScript('create'),
            ...everyoneView(),
            ...getFormHeader({
                prefix : 'create',
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
        return res.render('form', {
            btnTitle : 'update',
            formElement : require('../database/elements')['form']['public']['edit'],
            index : index,
            inputType : require('../database/options')['inputType'],
            pageTitle : ('json-admin').split('-').join(' ') + ' edit',
            script : getScript(allNames),
            ...everyoneView(),
            ...getFormHeader({
                prefix : ('json-admin').split('-').join('/'),
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
            prefix : ('json-admin').split('-').join('/'),
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