const {
    names : {
        order : item,
    }
} = require('../database/elements');
const {
    Order,
    Product,
    Public,
} = require('../models');
const prefix = '/order/';
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
        fk_public : getRandomInt(1, 9),
    });
};
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(prefix + 'all');
    },
    all : async (req, res, next) => {
        const allNames = 'all';
        const index = await Order.findAll({
            include : {
                model : Public,
                as : 'public',
                required : true,
            },
        });
        return res.send(index);
        // return res.render(viewName(prefix, allNames), {
        //     index : index,
        //     item : item,
        //     pageTitle : pageTitle(prefix, allNames),
        //     pathPrefix : viewName(prefix),
        //     script : script(allNames),
        //     capitalize,
        //     cleaner,
        //     currency,
        //     roman,
        //     validate,
        //     session,
        // });
    },
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req['params'];
        const index = await Order.findOne({
            where : {
                id : id,
            },
            include : {
                model : Public,
                as : 'public',
                required : true,
            },
        });
        return res.send(index);
        // return res.render(viewName(prefix, allNames), {
        //     index : index,
        //     item : item,
        //     pageTitle : pageTitle(prefix, allNames),
        //     pathPrefix : viewName(prefix),
        //     script : script(allNames),
        //     capitalize,
        //     cleaner,
        //     currency,
        //     roman,
        //     validate,
        //     session,
        // });
    },
    create : async (req, res, next) => {
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Order.findOne({
            where : {
                id : id,
            },
            include : {
                model : Public,
                as : 'public',
                required : true,
            },
        });
        return res.send(index);
    },
    store : async (req, res, next) => {
        const index = await Order.create({
            ...req['body'],
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    update : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Order.update({
            ...req.body,
        },
        {
            where : {
                id : id,
            },
            include : {
                model : Public,
                as : 'public',
                required : true,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Order.destroy({
            where : {
                id : id,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    bulk : async (req, res, next) => {
        const index = await Order.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};