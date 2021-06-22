const {
    forms : {
        category : {
            create,
            edit,
            view,
        }
    },
    names : {
        category : item,
    }
} = require('../database/elements');
const {
    inputType : inputType,
    lorem : {
        title,
        description,
    },
} = option = require('../database/options');
const {
    Category,
    Product,
} = require('../models');
const prefix = '/category/';
const {
    forEveryone,
    getModelPagination,
    getModelParams,
    getPageTitle,
    getScript,
    getURLPath,
    getViewName,
} = require('../utils');
const bulkList = [];
for (let i = 0; i < 10; i++) {
    bulkList.push({
        title : title,
        description : description,
    });
};
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(prefix + 'all');
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
        return res.render(getViewName(prefix, allNames), {
            index : index,
            item : item,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName(prefix),
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
        return res.render(getViewName(prefix, allNames), {
            index : index['product'],
            item : item,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName('/product/'),
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
        const index = await Category.create({
            ...req['body'],
        });
        return res.redirect(getURLPath(prefix, 'all'));
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
        return res.redirect(getURLPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Category.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
        const index = await Category.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};