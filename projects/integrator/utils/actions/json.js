const dataBase = require('../../database/json/clients');
let {
    everyoneView,
    getFormHeader,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getScript,
    getURLPath,
} = require('..');
const getIndex = (object) => {
    const Action = {
        index : (req, res, next) => {
        },
    }
    return Action;
};
const getAll = (object) => {
    const Action = {
        all : (req, res, next) => {
            const { page = 1 } = req['query'];
            return res.render('menu', {
                index : JSONPagination({
                    array : dataBase,
                    limit : 2,
                    offset : page,
                })['listPage'],
                item : require('../../database/elements')['name']['public'],
                pageTitle : ('json-admin').split('-').join(' ') + ' all',
                pathPrefix : ('json-admin').split('-').join('/'),
                script : getScript('all'),
                ...everyoneView(),
                ...JSONPagination({
                    array : dataBase,
                    limit : 2,
                    offset : page,
                }),
            });
        },
    }
    return Action;
};
const getOne = (object) => {
    const Action = {
        one : (req, res, next) => {
            const { id } = req['params'];
            const index = dataBase.find((index) => {
                return index['id'] == id;
            });
            return res.render('form', {
                btnTitle : 'come back',
                formElement : require('../../database/elements')['form']['public']['view'],
                index : index,
                inputType : require('../../database/options')['inputType'],
                pageTitle : ('json-admin').split('-').join(' ') + ' one',
                script : getScript('one'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : 'json-admin',
                    suffix : 'one',
                    enctype : '',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};


const getCreate = (object) => {
    const Action = {
        create : (req, res, next) => {
            return res.render('form', {
                btnTitle : 'create',
                formElement : require('../../database/elements')['form']['public']['create'],
                inputType : require('../../database/options')['inputType'],
                pageTitle : ('json-admin').split('-').join(' ') + ' create',
                script : getScript('create'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : 'create',
                    suffix : 'save',
                    enctype : '',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

module.exports = {
    getIndex,
    getAll,
    getOne,
    getCreate,
};