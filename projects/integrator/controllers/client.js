const {
    forms : {
        public : {
            create,
            edit,
            view,
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
} = require('../models');
const prefix = '/client/';
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
    index : async (req, res, next) => {
        return res.redirect(urlPath(prefix, 'all'));
    },
    all : async (req, res, next) => {
        const amount = 2;
        const { page = 1 } = req.query;
        const { count, rows : index } = await Public.findAndCountAll({
            limit : amount,
            offset : (page - 1) * amount,
        });
        const fullPage = Math.round(count / amount);
        const nextPage = Number(page) < Number(fullPage) ? Number(page) + 1 : Number(fullPage);
        const prevPage = Number(page) <= 1 ? 1 : Number(page) - 1;
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : index,
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
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req.params;
        const index = await Public.findOne({
            where : {
                id : id,
            },
        });
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

    // -----

    create : async (req, res, next) => {
        let allNames = 'create';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, allNames),
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
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req.params;
        const index = await Public.findByPk(id);
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, allNames) + '/' + id + '?_method=PUT',
                enctype : '',
                method : 'POST',
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
    store : async (req, res, next) => {
        req.body['password'] = require('bcrypt').hashSync(req.body['password'], 10);
        const index = await Public.create({
            ...req.body
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    update : async (req, res, next) => {
        const { id } = req.params;
        const index = await Public.update({
            ...req.body
        },
        {
            where : {
                id : id,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req.params;
        const index = await Public.destroy({
            where : {
                id : id,
            }
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
    },
    search : async (req, res, next) => {
    },
    login : async (req, res, next) => {
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
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    authenticate : async (req, res, next) => {
    },
    logout : async (req, res, next) => {
    },
};