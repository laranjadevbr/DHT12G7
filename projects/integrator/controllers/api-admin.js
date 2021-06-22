const {
    Public,
    Order,
} = require('../models');
const prefix = '/api-admin/all/';
const {
    getModelParams,
    getModelSearchParams,
} = require('../utils');
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(prefix);
    },
    all : async (req, res, next) => {
        // http://localhost:8888/api/admin/all?key=francisco
        const { key } = req['query'];
        const {
            count,
            rows,
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : key,
                column : 'title',
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
            return res.redirect(prefix);
        } else {
            const index = await Public.findOne({
                ...getModelParams({
                    model : Order,
                    alias : 'order',
                    param : id,
                    column : 'id',
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