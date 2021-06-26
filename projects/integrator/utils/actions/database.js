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
        index : async (req, res, next) => {
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
    }
    return Action;
};

const getAll = (object) => {
    const Action = {
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
                item : require('../../database/elements')['name'][object['title']],
                inputType : require('../../database/options')['inputType'],
                key : key,
                pageTitle : object['prefix'].split('-').join(' ') + ' all',
                pathPrefix : object['prefix'].split('-').join('/'),
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...everyoneView(),
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

const getOne = (object) => {
    const Action = {
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
                formElement : require('../../database/elements')['form'][object['title']]['view'],
                index : index,
                inputType : require('../../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' one',
                script : getScript('one'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'all',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

const getCreate = (object) => {
    const Action = {
        create : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'create',
                formElement : require('../../database/elements')['form'][object['title']]['create'],
                inputType : require('../../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' create',
                script : getScript('create'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'create',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

const getStore = (object) => {
    const Action = {
        store : async (req, res, next) => {
            const index = await object['modelName'].create({
                ...req['body'],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
    }
    return Action;
};

const getEdit = (object) => {
    const Action = {
        edit : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    param : id,
                }),
            });
            return res.render('form', {
                btnTitle : 'update',
                formElement : require('../../database/elements')['form'][object['title']]['edit'],
                index : index,
                inputType : require('../../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' edit',
                script : getScript('edit'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit' + '/' + id + '?_method=PUT',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

const getUpdate = (object) => {
    const Action = {
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
    }
    return Action;
};

const getDestroy = (object) => {
    const Action = {
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
    }
    return Action;
};

const getBulk = (object) => {
    const Action = {
        bulk : async (req, res, next) => {
            const index = object['bulkMaker']
            ? await object['modelName'].bulkCreate(object['bulkMaker'])
            : 'File not found!';
            return res.send(index);
        },
    }
    return Action;
};

const getSearch = (object) => {
    const Action = {
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
                item : require('../../database/elements')['name'][object['title']],
                inputType : require('../../database/options')['inputType'],
                key : key,
                pageTitle : object['prefix'].split('-').join(' ') + ' all',
                pathPrefix : object['prefix'].split('-').join('/'),
                script : getScript('all'),
                searchAction : getURLPath({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...everyoneView(),
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



const getLogin = (object) => {
    const Action = {
        login : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'login',
                formElement : require('../../database/elements')['form'][object['title']]['login'],
                inputType : require('../../database/options')['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' login',
                script : getScript('login'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'authenticate',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};


const getLogout = (object) => {
    const Action = {
        logout : async (req, res, next) => {
            req.session.destroy();
            return res.redirect('/');
        },
    }
    return Action;
};


const getAuthenticate = (object) => {
    const Action = {
        authenticate : async (req, res, next) => {
            const {
                email,
                password,
            } = req['body'];
            const user = await object['modelName'].findOne({
                ...getModelParams({
                    param : email,
                    column : 'email',
                }),
            });
            let screen = (method, allNames) => {
                return method.render('form', {
                    btnTitle : allNames,
                    formElement : require('../../database/elements')['form'][object['title']]['login'],
                    inputType : require('../../database/options')['inputType'],
                    pageTitle : object['prefix'].split('-').join(' ') + ' ' + allNames,
                    script : getScript(allNames),
                    ...everyoneView(),
                    ...getFormHeader({
                        prefix : object['prefix'],
                        suffix : allNames,
                        method : 'POST',
                    }),
                });
            };
            if (!user) screen(res, 'login');
            if (!isEqual({
                client : password,
                dataBase : user['password'],
            })) screen(res, 'login');
            user['password'] = undefined;
            req.session.user = user;
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
    }
    return Action;
};
module.exports = {
    getIndex,
    getAll,
    getOne,
    getCreate,
    getStore,
    getEdit,
    getUpdate,
    getDestroy,
    getBulk,
    getSearch,
    getLogin,
    getAuthenticate,
    getLogout,
};