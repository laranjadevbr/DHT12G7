let {
    forAllPages,
    getFirstUpperCase,
    getFormElement,
    getFormHeader,
    getInputType,
    getItem,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getPageTitle,
    getPathPrefix,
    getScriptModule,
    getSearchAction,
    getMenuSetup,
    getURLPath,
} = require('..');

// OK!

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

// OK!

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
                    column : 'id',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
            });
            return res.render('menu', {
                key : key,
                index : index,
                ...forAllPages(),
                ...getInputType(),
                ...getItem(object['element']),
                ...getMenuSetup(object['prefix']),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'all',
                }),
                ...getPathPrefix(object['prefix']),
                ...getScriptModule('all'),
                ...getSearchAction({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
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

// OK!

const getIn = (object) => {
    const Action = {
        in : async (req, res, next) => {
            const amount = 1;
            const {
                page = 1,
                key = '',
            } = req['query'];
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : id,
                    column : 'id',
                    limit : amount,
                    offset : (page - 1) * amount,
                }),
            });
            return res.render('menu', {
                key : key,
                index : index[object['includeAlias']],
                ...forAllPages(),
                ...getInputType(),
                ...object['includeAlias'] ? getItem(object['includeAlias']) : undefined,
                ...getMenuSetup(object['prefix']),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'in',
                }),
                ...getPathPrefix(object['prefix'].replace('category', 'item')),
                ...getScriptModule('in'),
                ...getSearchAction({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...getModelPagination({
                    count : index['length'],
                    amount : amount,
                    offset : page,
                }),
            });
        },
    }
    return Action;
};

// OK!

const getOn = (object) => {
    const Action = {
        on : async (req, res, next) => {
            const { id } = req['params'];
            const index = await object['modelName'].findOne({
                ...getModelParams({
                    model : object['includeName'],
                    alias : object['includeAlias'],
                    param : id,
                    column : 'id',
                }),
            });
            return res.render('form', {
                index : index,
                btnTitle : 'come back',
                ...forAllPages(),
                ...getMenuSetup(object['prefix']),
                ...getFormElement({
                    element : object['element'],
                    type : 'view',
                }),
                ...getInputType(),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'on',
                }),
                ...getScriptModule('on'),                
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'on',
                    // enctype : 'multipart/form-data',
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
                ...forAllPages(),
                ...getFormElement({ element : object['element'], type : 'create' }),
                ...getInputType(),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'create' }),
                ...getScriptModule('create'),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'create',
                    // enctype : 'multipart/form-data',
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
            conso
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
                    column : 'id',
                }),
            });
            return res.render('form', {
                index : index,
                btnTitle : 'edit',
                ...forAllPages(),
                ...getFormElement({
                    element : object['element'],
                    type : 'edit',
                }),
                ...getInputType(),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'edit',
                }),
                ...getScriptModule('edit'),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit' + '/' + id + '?_method=PUT',
                    // enctype : 'multipart/form-data',
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
                    column : 'id',
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
                    column : 'id',
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
            const index = object['bulkMaker'] ? await object['modelName'].bulkCreate(object['bulkMaker']) : getFirstUpperCase('File not found!');
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
                key : key,
                index : index,
                ...forAllPages(),
                ...getInputType(),
                ...getItem(object['element']),
                ...getMenuSetup(object['prefix']),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
                ...getPathPrefix(object['prefix']),
                ...getScriptModule('search'),
                ...getSearchAction({
                    prefix : object['prefix'],
                    suffix : 'search',
                }),
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
                ...forAllPages(),
                ...getFormElement({
                    element : object['element'],
                    type : 'login',
                }),
                ...getInputType(),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'login',
                }),
                ...getScriptModule('login'),
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
        },
    }
    return Action;
};

const getAuthenticate = (object) => {
    const Action = {
        authenticate : async (req, res, next) => {
        },
    }
    return Action;
};

module.exports = {
    getAll,
    getAuthenticate,
    getBulk,
    getCreate,
    getDestroy,
    getEdit,
    getIndex,
    getIn,
    getLogin,
    getLogout,
    getOn,
    getSearch,
    getStore,
    getUpdate,
};