let {
    forEveryone,
    getFormHeader,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getScript,
    getURLPath,
} = require('.');
const everyoneItem = (object) => {
    const Action = {
        index : async (req, res, next) => {
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },

        // -----

        all : async (req, res, next) => {
            const amount = 2;
            const {
                page = 1,
                key = '',
            } = req['query'];
            const {
                count,
                rows : index,
            } = await object['modelName'].findAndCountAll({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : key,
                    column : 'title',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
            });
            return res.render('menu', {
                index : index,
                item : require('../database/elements')['name'][object['title']],
                inputType : require('../database/options')['inputType'],
                key : key,
                pageTitle : object['prefix'].split('-').join(' ') + ' all',
                pathPrefix : object['prefix'].split('-').join('/'),
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...forEveryone(),
                ...getModelPagination({
                    count : count,
                    amount : amount,
                    offset : page,
                }),
            });
        },
        one : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : id,
                }),
            });
            return res.render('form', {
                btnTitle : 'come back',
                formElement : require('../database/elements')['form'][object['title']]['view'],
                index : index,
                inputType : require('../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' one',
                script : getScript('one'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'all',
                    method : 'POST',
                }),
            });
        },

        // -----

        create : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'create',
                formElement : require('../database/elements')['form'][object['title']]['create'],
                inputType : require('../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' create',
                script : getScript('create'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'create',
                    method : 'POST',
                }),
            });
        },
        store : async (req, res, next) => {
            const index = await object['modelName'].create({
                ...req['body'],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },

        // -----

        edit : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    param : id,
                }),
            });
            return res.render('form', {
                btnTitle : 'update',
                formElement : require('../database/elements')['form'][object['title']]['edit'],
                index : index,
                inputType : require('../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' edit',
                script : getScript('edit'),
                ...forEveryone(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit' + '/' + id + '?_method=PUT',
                    method : 'POST',
                }),
            });
        },
        update : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].update({
                ...req['body'],
            },
            {
                ...getModelParams({
                    param : id,
                }),
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },

        // -----

        destroy : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].destroy({
                ...getModelParams({
                    param : id,
                }),
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },

        // ----

        bulk : async (req, res, next) => {
            const index = object['bulkMaker']
            ? await object['modelName'].bulkCreate(object['bulkMaker'])
            : 'File not found!';
            return res.send(index);
        },

        // -----
        
        search : async (req, res, next) => {
            const amount = 2;
            const {
                page = 1,
                key = '',
            } = req['query'];
            const {
                count,
                rows : index,
            } = await object['modelName'].findAndCountAll({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : key,
                    column : 'id',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
                ...getModelSearchParams({
                    array : [
                        'description',
                        'title',
                    ],
                    key : key,
                }),
            });
            return res.render('menu', {
                index : index,
                item : require('../database/elements')['name'][object['title']],
                inputType : require('../database/options')['inputType'],
                key : key,
                pageTitle : object['prefix'].split('-').join(' ') + ' all',
                pathPrefix : object['prefix'].split('-').join('/'),
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...forEveryone(),
                ...getModelPagination({
                    count : count,
                    amount : amount,
                    offset : page,
                }),
            });
        },
    }
    return Action;
};
module.exports = {
    everyoneItem,  
};