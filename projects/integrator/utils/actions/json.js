const dataBase = require('../../database/json/clients');

let {
    everyoneView,
    getFormHeader,
    JSONPagination,
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
                item : require('../../database/elements')['name'][object['title']],
                pageTitle : (object['prefix']).split('-').join(' ') + ' all',
                pathPrefix : (object['prefix']).split('-').join('/'),
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
                formElement : require('../../database/elements')['form'][object['title']]['view'],
                index : index,
                inputType : require('../../database/options')['inputType'],
                pageTitle : (object['prefix']).split('-').join(' ') + ' one',
                script : getScript('one'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'one',
                    enctype : '',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

const getEdit = (object) => {
    const Action = {
        edit : (req, res, next) => {
            const { id } = req['params'];
            const index = dataBase.find((index) => {
                return index['id'] == id;
            });
            return res.render('form', {
                btnTitle : 'update',
                formElement : require('../../database/elements')['form'][object['title']]['edit'],
                index : index,
                inputType : require('../../database/options')['inputType'],
                pageTitle : (object['prefix']).split('-').join(' ') + ' edit',
                script : getScript('edit'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : (object['prefix']).split('-').join('/'),
                    suffix : 'update' + '/' + id,
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
                formElement : require('../../database/elements')['form'][object['title']]['create'],
                inputType : require('../../database/options')['inputType'],
                pageTitle : (object['prefix']).split('-').join(' ') + ' create',
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

const getStore = (object) => {
    const Action = {
        store : (req, res, next) => {
            req['body']['password'] = getHash(req['body']['password']);
            const index = {
                active : true,
                id : dataBase[dataBase['length'] - 1]['id'] + 1,
                ...req['body'],
            };
            dataBase.push(index);
            JSONModify({
                name : 'clients',
                content : dataBase,
                path : '../../database/json/clients.js',
            });
            return res.send(index);
        },
    }
    return Action;
};

const getUpdate = (object) => {
    const Action = {
        update : (req, res, next) => {
        },
    }
    return Action;
};

const getDestroy = (object) => {
    const Action = {
        destroy : (req, res, next) => {
            const { id } = req['params'];
            const index = dataBase.filter((index) => {
                return index['id'] !== id;
            });
            JSONModify({
                name : 'clients',
                content : index,
                path : '../../database/json/clients.js',
            });
            return res.redirect(getURLPath({
                prefix : (object['prefix']).split('-').join('/'),
                suffix : 'view',
            }));
        },
    }
    return Action;
};

const getSearch = (object) => {
    const Action = {
        search : (req, res, next) => {
        },
    }
    return Action;
};

const getLogin = (object) => {
    const Action = {
        login : (req, res, next) => {
        },
    }
    return Action;
};

const getLogout = (object) => {
    const Action = {
        logout : (req, res, next) => {
        },
    }
    return Action;
};

const getAuthenticate = (object) => {
    const Action = {
        authenticate : (req, res, next) => {
        },
    }
    return Action;
};

module.exports = {
    getAll,
    getAuthenticate,
    getCreate,
    getDestroy,
    getEdit,
    getIndex,
    getLogin,
    getLogout,
    getOne,
    getSearch,
    getStore,
    getUpdate,
};