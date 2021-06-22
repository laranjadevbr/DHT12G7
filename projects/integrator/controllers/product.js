const {
    forms : {
        product : {
            create,
            edit,
            view,
        }
    },
    names : {
        product : item,
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
const prefix = '/product/';
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
        cost : Math.floor(Math.random() * 999 + 100),
        fk_category : Math.floor(Math.random() * 9 + 1),
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
            key = '',
        } = req['query'];
        const {
            count,
            rows : index,
        } = await Product.findAndCountAll({
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
        const { id } = req['params'];
        const index = await Product.findOne({
            ...getModelParams({
                model : Category,
                alias : 'category',
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
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Product.findOne({
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
    store : async (req, res, next) => {
        const index = await Product.create({
            ...req['body'],
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    update : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Product.update({
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
        const index = await Product.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
        const index = await Product.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};