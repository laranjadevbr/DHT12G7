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
        return res.redirect(getURLPath(prefix, 'all'));
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
        return res.render(getViewName(prefix, allNames), {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName(prefix),
            script : getScript(allNames),
            searchAction : getURLPath(prefix, 'search'),
            ...forEveryone(),
            ...getModelPagination({
                count : count,
                amount : amount,
                page : page,
            }),
        });
    },
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req.params;
        const index = await Public.findOne({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : id,
                column : 'id',
            }),
        });
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, 'all'),
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'come back',
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    create : async (req, res, next) => {
        const allNames = 'create';
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, allNames),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    store : async (req, res, next) => {
        req['body']['password'] = getHash(req['body']['password']);
        const index = await Public.create({
            ...req['body'],
        });
        return res.redirect(getURLPath(prefix, 'all'));
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
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, allNames) + '/' + id + '?_method=PUT',
                enctype : '',
                method : 'POST',
            },
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
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
        return res.redirect(getURLPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Public.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    login : async (req, res, next) => {
        const allNames = 'login';
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, 'authenticate'),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : login,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    authenticate : async (req, res, next) => {
        let screen = (method, allNames) => {
            return method.render(getViewName(prefix, allNames), {
                form : {
                    action : getURLPath(prefix, allNames),
                    enctype : '',
                    method : 'POST',
                },
                btnTitle : allNames,
                formElement : login,
                inputType : inputType,
                pageTitle : getPageTitle(prefix, allNames),
                script : getScript(allNames),
                ...forEveryone(),
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
        if (!isEqual(password, user['password'])) screen(res, 'login');
        user['password'] = undefined;
        req.session.user = user;
        return res.redirect(getURLPath(prefix, 'all'));
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
        return res.render(getViewName(prefix, allNames), {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName(prefix),
            script : getScript(allNames),
            searchAction : getURLPath(prefix, 'search'),
            ...forEveryone(),
            ...getModelPagination({
                count : count,
                amount : amount,
                page : page,
            }),
        });
    },
}