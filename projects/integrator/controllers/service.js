const {
    forms : {
        service : {
            create,
            edit,
            view,
        }
    },
    names : {
        service : item,
    }
} = require('../database/elements');

const {
    inputType : inputType,
} = option = require('../database/options');

const {
    Category,
    Service,
} = require('../models');

const prefix = '/service/';

const {
    forEveryone,
    getFormHeader,
    getModelPagination,
    getModelParams,
    getPageTitle,
    getScript,
    getURLPath,
    getViewName,
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
        } = await Service.findAndCountAll({
            ...getModelParams({
                model : Category,
                alias : 'category',
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
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req['params'];
        const index = await Service.findOne({
            ...getModelParams({
                model : Category,
                alias : 'category',
                param : id,
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
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Service.findOne({
            ...getModelParams({
                param : id,
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
    store : async (req, res, next) => {
        const index = await Service.create({
            ...req['body'],
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    update : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Service.update({
            ...req['body'],
        },
        {
            ...getModelParams({
                param : id,
            }),
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Service.destroy({
            ...getModelParams({
                param : id,
            }),
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    bulk : async (req, res, next) => {
        const index = await Service.bulkCreate(require('../bulkmakers/service'));
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};