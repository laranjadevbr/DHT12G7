const {
    Category,
    Event,
} = require('../models');
const prefix = '/api-category-event/';
const {
    getModelParams,
    getModelSearchParams,
    getURLPath,
} = require('../utils');
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    all : async (req, res, next) => {
        const { key } = req['query'];
        const {
            count,
            rows,
        } = await Category.findAndCountAll({
            ...getModelParams({
                model : Event,
                alias : 'event',
                param : key,
                column : 'id',
            }),
            ...key ? {
                ...getModelSearchParams({
                    array : [
                        'title',
                    ],
                    key : key,
                }),
            } : {
            },
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
            return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
        } else {
            const index = await Category.findOne({
                ...getModelParams({
                    model : Event,
                    alias : 'event',
                    param : id,
                }),
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