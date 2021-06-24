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
const {
    inputType : inputType,
} = option = require('../database/options');
const {
    Public,
    Order,
} = require('../models');
const prefix = '/user/';
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
    getViewName,
    isEqual,
} = require('../utils');
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(getURLPath({
            prefix : prefix,
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
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : key,
                column : 'title',
                limit : amount,
                offset : (page - 1) * amount,
            }),
        });
        const allNames = 'all';
        return res.render('menu', {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            pathPrefix : getViewName({
                prefix : prefix
            }),
            script : getScript(allNames),
            searchAction : getURLPath({
                prefix : prefix,
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
        const allNames = 'one';
        const { id } = req['params'];
        const index = await Public.findOne({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : id,
                column : 'id',
            }),
        });
        return res.render('form', {
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
                method : 'POST',
            }),
        });
    },
    create : async (req, res, next) => {
        const allNames = 'create';
        return res.render('form', {
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
                suffix : allNames,
                method : 'POST',
            }),
        });
    },
    store : async (req, res, next) => {
        req['body']['password'] = getHash(req['body']['password']);
        const index = await Public.create({
            ...req['body'],
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Public.findOne({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.render('form', {
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
                suffix : allNames + '/' + id + '?_method=PUT',
                method : 'POST',
            }),
        });
    },
    update : async (req, res, next) => {
        const { id } = req.params;
        const index = await Public.update({
            ...req['body'],
        },
        {
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Public.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    login : async (req, res, next) => {
        const allNames = 'login';
        return res.render('form', {
            btnTitle : allNames,
            formElement : login,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            script : getScript(allNames),
            ...forEveryone(),
            ...getFormHeader({
                prefix : prefix,
                suffix : 'authenticate',
                method : 'POST',
            }),
        });
    },
    authenticate : async (req, res, next) => {
        let screen = (method, allNames) => {
            return method.render('form', {
                btnTitle : allNames,
                formElement : login,
                inputType : inputType,
                pageTitle : getPageTitle({
                    prefix : prefix,
                    suffix : allNames,
                }),
                script : getScript(allNames),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : prefix,
                    suffix : allNames,
                    method : 'POST',
                }),
            });
        };
        const {
            email,
            password,
        } = req['body'];
        const user = await Public.findOne({
            ...getModelParams({
                param : email,
                column : 'email',
            }),
        });
        if (!user) screen(res, 'login');
        if (!isEqual({ client : password, dataBase : user['password'] })) screen(res, 'login');
        user['password'] = undefined;
        req.session.user = user;
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    logout : async (req, res, next) => {
        req.session.destroy();
        return res.redirect('/');
    },
    bulk : async (req, res, next) => {
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
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
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
        const allNames = 'all';
        return res.render('menu', {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            pathPrefix : getViewName({
                prefix : prefix,
            }),
            script : getScript(allNames),
            searchAction : getURLPath({
                prefix : prefix,
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