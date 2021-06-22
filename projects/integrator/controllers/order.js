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
    getRandomNumber,
    urlPath,
    getModelParams,
    forEveryone,
} = require('../utils');
const bulkList = [];
for (let i = 0; i < 10; i++) {
    bulkList.push({
        fk_public : getRandomNumber(1, 9),
    });
};
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(prefix + 'all');
    },
    all : async (req, res, next) => {
        const allNames = 'all';
        const index = await Order.findAll({
            ...getModelParams({
                model : Product,
                alias : 'product',
            }),
        });
        return res.render(viewName(prefix, allNames), {
            index : index,
            item : item,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            script : script(allNames),
            ...forEveryone(),
        });
    },
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req['params'];
        const index = await Order.findOne({
            ...getModelParams({
                model : Product,
                alias : 'product',
                param : id,
            }),
        });
        return res.render(viewName(prefix, allNames), {
            index : index,
            item : item,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            script : script(allNames),
            ...forEveryone(),
        });
    },
    create : async (req, res, next) => {
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Order.findOne({
            ...getModelParams({
                param : id,
            }),
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
            ...getModelParams({
                param : id,
            }),
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Order.destroy({
            ...getModelParams({
                param : id,
            }),
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