let {
    addJsDatabase,
    addJsonDatabase,
    forAllPages,
    getFormElement,
    getFormHeader,
    getHash,
    getInputType,
    getItem,
    getJsDatabase,
    getJsPagination,
    getMenuSetup,
    getPageTitle,
    getPathPrefix,
    getScriptModule,
    getURLPath,
    getUserSession,
    isEmpty,
    isEqual,
    jsonFileReader,
    saveJsDatabase,
} = require('..');

// OK!

const getIndex = (object) => {
    const Action = {
        index : (req, res, next) => {
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
        all : (req, res, next) => {
            const amount = 2;
            const { page = 1 } = req['query'];
            return res.render('menu', {
                index : getJsPagination({
                    array : getJsDatabase(object),
                    limit : amount,
                    offset : page,
                })['listPage'],
                ...forAllPages(),
                ...getItem(object['element']),
                ...getMenuSetup(object['prefix']),
                ...getPageTitle({
                    prefix : object['prefix'],
                    suffix : 'all',
                }),
                ...getPathPrefix(object['prefix']),
                ...getScriptModule('all'),
                ...getUserSession(req['session']['user']),
                ...getJsPagination({
                    array : getJsDatabase(object),
                    limit : amount,
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
        on : (req, res, next) => {
            const { id } = req['params'];
            return res.render('form', {
                index : getJsDatabase(object).find((index) => {
                    return index['id'] == id;
                }),
                btnTitle : 'come back',
                ...forAllPages(),
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
                ...getUserSession(req['session']['user']),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'on',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

// OK!

const getEdit = (object) => {
    const Action = {
        edit : (req, res, next) => {
            const { id } = req['params'];
            return res.render('form', {
                index : getJsDatabase(object).find((index) => {
                    return index['id'] == id;
                }),
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
                ...getUserSession(req['session']['user']),
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit/' + id + '?_method=PUT',
                    enctype : 'multipart/form-data',
                    method : 'POST',
                }),
            });
        },
    }
    return Action;
};

const {
    check,
    validationResult,
    body,
} = require('express-validator');

// OK!

const formAttributes = (req, res, next, object, error) => {
    return {
        btnTitle : 'create',
        ...forAllPages(),
        ...getFormElement({
            element : object['element'],
            type : 'create',
        }),
        ...getInputType(),
        ...getPageTitle({
            prefix : object['prefix'],
            suffix : 'create',
        }),
        ...getScriptModule('create'),
        ...getUserSession(req['session']['user']),
        ...getFormHeader({
            prefix : object['prefix'],
            suffix : 'create',
            enctype : 'multipart/form-data',
            method : 'POST',
        }),
        error : error ? error['errors'] : undefined,
    };
};

const getCreate = (object) => {
    const Action = {
        create : (req, res, next) => {
            return res.render('form', {
                ...formAttributes(req, res, next, object),
            });
        },
    }
    return Action;
};

// OK!

const getStore = (object) => {
    const Action = {
        store : (req, res, next) => {
            const error = validationResult(req);
            if (error.isEmpty()) {
                const { files } = req;
                const password = getHash(req['body']['password']);
                const id = !isEmpty(getJsDatabase(object))
                ? getJsDatabase(object)[getJsDatabase(object)['length'] - 1]['id'] + 1 : 1;
                const newPush = {
                    attachment : {
                        ...req['body'],
                        id : id,
                        approved : true,
                        deleted : false,
                        disable : false,
                        picture : files['length'] ? files[0]['filename'] : '',
                        password : password,
                        confirmation : password,
                    },
                    require : [
                        ...object['require'],
                    ],
                    title : object['title'],
                }
                addJsDatabase({
                    ...newPush,
                });
                addJsonDatabase({
                    ...newPush,
                });
                return res.redirect(getURLPath({
                    prefix : object['prefix'],
                    suffix : 'edit' + '/' + id,
                }));
            } else {
                return res.render('form', {
                    ...formAttributes(req, res, next, object, error),
                });
            };
        },
    };
    return Action;
};

// OK!

const getUpdate = (object) => {
    const Action = {
        update : (req, res, next) => {
            const { id } = req['params'];
            let database = getJsDatabase(object);
            let index = database.find((index) => {
                return index['id'] == id;
            });
            for (let i = 0; i < Object.getOwnPropertyNames(req['body'])['length']; i++)
                index[Object.getOwnPropertyNames(req['body'])[i]] = Object.getOwnPropertyDescriptors(req['body'])[Object.getOwnPropertyNames(req['body'])[i]]['value'];
            saveJsDatabase({
                content : database,
                require : [
                    ...object['require'],
                ],
                title : object['title'],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'edit' + '/' + id,
            }));
        },
    };
    return Action;
};

// OK!

const getDestroy = (object) => {
    const Action = {
        destroy : (req, res, next) => {
            const { id } = req['params'];
            saveJsDatabase({
                content : getJsDatabase(object).filter((index) => {
                    return index['id'] != id;
                }),
                require : [
                    ...object['require'],
                ],
                title : object['title'],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
        },
    };
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
        logout : (req, res, next) => {
        },
    }
    return Action;
};

const getAuthenticate = (object) => {
    const Action = {
        authenticate : (req, res, next) => {
            const record = jsonFileReader([
                'database',
                'texts',
                'client.json',
            ]);
            const index = record.find((index) => {
                return index['accesskey'] === req['body']['accesskey'];
            });
            if (!index) 
                return res.send('invalid user!');
            if (!isEqual({ front : req['body']['password'], back : index['password'] })) 
                return res.send('invalid password!');
            delete index['password'];
            delete index['confirmation'];
            req['session']['user'] = index;
            return res.redirect(getURLPath({
                prefix : object['prefix'],
                suffix : 'all',
            }));
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
    getOn,
    getSearch,
    getStore,
    getUpdate,
};