const {
    forms : {
        public : {
            create,
            edit,
            view,
            login,
        }
    },
    names : {
        public : item,
    }
} = require('../database/elements');
let {
    forEveryone,
    getFormHeader,
    getHash,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getPageTitle,
    getScript,
    getURLPath,
    isEqual,
} = require('./');
const everyonePublic = (object) => {
    const Action = {
        index : async (req, res, next) => {
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
        all : async (req, res, next) => {
            const amount = 2;
            const {
                page = 1,
                key = '',
            } = req['query'];
            const {
                count,
                rows : index,
            } = await object['modelName'].findAndCountAll({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : key,
                    column : 'title',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
            });
            return res.render('menu', {
                index : index,
                item : item,
                inputType : require('../database/options')['inputType'],
                key : key,
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'all',
                }),
                pathPrefix : object['prefix'],
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...forEveryone(),
                ...getModelPagination({
                    count : count,
                    amount : amount,
                    offset : page,
                }),
            });
        },
        one : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : id,
                    column : 'id',
                }),
            });
            return res.render('form', {
                btnTitle : 'come back',
                formElement : view,
                index : index,
                inputType : require('../database/options')['inputType'],
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'one',
                }),
                script : getScript('one'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'all',
                    method : 'POST',
                }),
            });
        },
        create : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'create',
                formElement : create,
                inputType : require('../database/options')['inputType'],
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'create',
                }),
                script : getScript('create'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'create',
                    method : 'POST',
                }),
            });
        },
        store : async (req, res, next) => {
            req['body']['password'] = getHash(req['body']['password']);
            const index = await object['modelName'].create({
                ...req['body'],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
        edit : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    param : id,
                    column : 'id',
                }),
            });
            return res.render('form', {
                btnTitle : 'update',
                formElement : edit,
                index : index,
                inputType : require('../database/options')['inputType'],
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'edit',
                }),
                script : getScript('edit'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit' + '/' + id + '?_method=PUT',
                    method : 'POST',
                }),
            });
        },
        update : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].update({
                ...req['body'],
            },
            {
                ...getModelParams({
                    param : id,
                    column : 'id',
                }),
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
        destroy : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].destroy({
                ...getModelParams({
                    param : id,
                    column : 'id',
                }),
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
        login : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'login',
                formElement : login,
                inputType : require('../database/options')['inputType'],
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'login',
                }),
                script : getScript('login'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'authenticate',
                    method : 'POST',
                }),
            });
        },
        authenticate : async (req, res, next) => {
            const {
                email,
                password,
            } = req['body'];
            const user = await object['modelName'].findOne({
                ...getModelParams({
                    param : email,
                    column : 'email',
                }),
            });
            let screen = (method, allNames) => {
                return method.render('form', {
                    btnTitle : allNames,
                    formElement : login,
                    inputType : require('../database/options')['inputType'],
                    pageTitle : getPageTitle({
                        prefix : object['prefix'],
                        suffix : allNames,
                    }),
                    script : getScript(allNames),
                    ...forEveryone(),
                    ...getFormHeader({
                        prefix : object['prefix'],
                        suffix : allNames,
                        method : 'POST',
                    }),
                });
            };

            if (!user) screen(res, 'login');
            if (!isEqual({ client : password, dataBase : user['password'] })) screen(res, 'login');
            user['password'] = undefined;
            req.session.user = user;
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
        logout : async (req, res, next) => {
            req.session.destroy();
            return res.redirect('/');
        },
        bulk : async (req, res, next) => {
            const index = await object['modelName'].bulkCreate(object['bulkMaker']);
            return res.send(index);
        },
        search : async (req, res, next) => {
            const amount = 2;
            const {
                page = 1,
                key = '',
            } = req['query'];
            const {
                count,
                rows : index,
            } = await object['modelName'].findAndCountAll({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : key,
                    column : 'id',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
                ...getModelSearchParams({
                    array : [
                        'description',
                        'title',
                    ],
                    key : key,
                }),
            });
            return res.render('menu', {
                index : index,
                item : item,
                inputType : require('../database/options')['inputType'],
                key : key,
                pageTitle : getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'all',
                }),
                pathPrefix : object['prefix'],
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...forEveryone(),
                ...getModelPagination({
                    count : count,
                    amount : amount,
                    offset : page,
                }),
            });
        },
    }
    return Action;
};
module.exports = {
    everyonePublic,  
};