const {
    forms : {
        service : {
            create,
            edit,
        },
    },
} = require('../database/elements');
const {
    inputType : inputType,
    lorem : {
        title,
        description,
    },
} = option = require('../database/options');
const {
    Service,
} = require('../models');
const prefix = '/service/';
const {
    forEveryone,
    getURLPath,
    getScript,
    getRandomNumber,
    getModelParams,
    getFormHeader,
    getViewName,
} = require('../utils');
const bulkList = [];
for (let i = 0; i < 10; i++) {
    bulkList.push({
        title : title,
        description : description,
        cost : getRandomNumber(100, 999),
        fk_category : getRandomNumber(1, 9),
    });
};
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    all : async (req, res, next) => {
    },
    one : async (req, res, next) => {
    },
    create : async (req, res, next) => {
        const allNames = 'create';
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
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
        const index = await Product.findOne({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.render(getViewName({ prefix : prefix, suffix : allNames }), {
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
                column : 'id',
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
                column : 'id',
            }),
        });
        return res.redirect(getURLPath({
            prefix : prefix,
            suffix : 'all',
        }));
    },
    bulk : async (req, res, next) => {
        const index = await Service.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
    },
};