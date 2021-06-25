const {
    forms : {
        category : {
            create,
            edit,
            view,
        },
    },
    names : {
        category : item,
    }
} = require('../database/elements');
const {
    inputType : inputType,
} = option = require('../database/options');
const {
    Category,
    Product,
} = require('../models');
const prefix = 'category-product';
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
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    all : async (req, res, next) => {
        const amount = 2;
        const {
            page = 1,
        } = req['query'];
        const {
            count,
            rows : index,
        } = await Category.findAndCountAll({
            ...getModelParams({
                model : Product,
                alias : 'product',
                column : 'id',
                limit : amount,
                offset : (page - 1) * amount,
            }),
        });
        const allNames = 'all';
        return res.render('menu', {
            index : index,
            item : item,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            pathPrefix : getViewName({
                prefix : prefix,
            }),
            script : getScript(allNames),
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
        const { id } = req['params'];
        const index = await Category.findOne({
            ...getModelParams({
                model : Product,
                alias : 'product',
                param : id,
                column : 'id',
            }),
        });
        return res.render('menu', {
            index : index['product'],
            item : item,
            inputType : inputType,
            pageTitle : getPageTitle({
                prefix : prefix,
                suffix : allNames,
            }),
            pathPrefix : getViewName({
                prefix : prefix,
            }),
            script : getScript(allNames),
            ...forEveryone(),
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
        const index = await Category.create({
            ...req['body'],
        });
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Category.findOne({
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
        const { id } = req['params'];
        const index = await Category.update({
            ...req['body'],
        },
        {
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Category.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    bulk : async (req, res, next) => {
        const index = await Category.bulkCreate(require('../bulkmakers/category-product'));
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};