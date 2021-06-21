const {
    Category,
    Product,
} = require('../models');
const prefix = '/api-categoty/all/';
const {
    getModelParams,
} = require('../utils');
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(prefix);
    },
    all : async (req, res, next) => {
        const {
            count,
            rows,
        } = await Category.findAndCountAll({
            ...getModelParams(Product, 'product', '', 'title'),
        }).then(result => {
            return res.status(200).json({
                count : result['count'],
                rows : result['rows'],
            });
        }).catch(error => {
            return res.status(400).json({
                error : error,
            });
        });
    },
    one : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) {
            return res.redirect(prefix);
        } else {
            const index = await Category.findOne({
                ...getModelParams(Product, 'product', id, 'id'),
            }).then(result => {
                return res.status(200).json({
                    result : result,
                });
            }).catch(error => {
                return res.status(400).json({
                    error : error,
                });
            });
        };
    },
};