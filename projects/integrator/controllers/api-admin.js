const {
    Public,
    Order,
} = require('../models');
const {
    getModelParams,
    getModelSearchParams,
    getURLPath,
} = require('../utils');
const prefix = '/api-admin/';
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(getURLPath({ prefix : prefix, suffix : 'all' }));
    },
    all : async (req, res, next) => {
        const { key } = req['query'];
        const {
            count,
            rows,
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
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
            const index = await Public.findOne({
                ...getModelParams({
                    model : Order,
                    alias : 'order',
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