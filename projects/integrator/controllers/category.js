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
    getModelParams,
} = require('../utils');
const session = (req, res, next) => {
    return req.session.user;
};
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
            ...getModelParams(Product, 'product'),
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
        const index = await Category.findOne({
            ...getModelParams(Product, 'product'),
            where : {
                id : id,
            },
        });
        return res.render(viewName(prefix, allNames), {
            index : index['product'],
            item : item,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName('/product/'),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    create : async (req, res, next) => {
        const allNames = 'create';
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
    store : async (req, res, next) => {
        const index = await Category.create({
            ...req['body'],
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Category.findOne({
            where : {
                id : id,
            },
        });
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
    update : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Category.update({
            ...req['body'],
        },
        {
            where : {
                id : id,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Category.destroy({
            where : {
                id : id,
            }
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
        const index = await Category.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};