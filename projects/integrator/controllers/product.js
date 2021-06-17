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
        const index = await Product.findAll({
            include : {
                model : Category,
                as : 'category',
                required : true,
            },
        });
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            index : index,
            item : item,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
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
        const { id } = req['params'];
        const index = await Product.findOne({
            where : {
                id : id,
            },
            include : {
                model : Category,
                as : 'category',
                required : true,
            },
        });
        const allNames = 'one';
        return res.render(viewName(prefix, allNames), {
            index : index,
            item : item,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
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
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Product.findByPk(id);
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
        const index = await Product.create({
            ...req.body
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    update : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Product.update({
            ...req['body'],
        },
        {
            where : {
                id : id,
            },
            include : {
                model : Category,
                as : 'category',
                required : true,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req.params;
        const index = await Product.destroy({
            where : {
                id : id,
            }
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
        const index = await Product.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};