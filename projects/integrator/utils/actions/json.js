let {
    addJsDatabase,
    addJsonDatabase,
    forAllPages,
    getFormElement,
    getFormHeader,
    getInputType,
    getItem,
    getHash,
    getJsDatabase,
    getJsPagination,
    getMenuSetup,
    getPageTitle,
    getPathPrefix,
    getScriptModule,
    getURLPath,
    isEmpty,
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
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'on',
                    enctype : 'multipart/form-data',
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
                ...getFormHeader({
                    prefix : object['prefix'],
                    suffix : 'edit/' + id + '?_method=PUT',
                    // enctype : 'multipart/form-data',
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

const formAttributes = (object, error) => {
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
                ...formAttributes(object),
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
                let { files } = req;
                req['body']['password'] ? getHash(req['body']['password']) : '';
                const id = !isEmpty(getJsDatabase(object)) ? getJsDatabase(object)[getJsDatabase(object)['length'] - 1]['id'] + 1 : 1;
                const newPush = {
                    attachment : {
                        id : id,
                        approved : true,
                        deleted : false,
                        disable : false,
                        picture : files['length'] ? files[0]['filename'] : '',
                        ...req['body'],
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
                    ...formAttributes(object, error),
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
            for (let i = 0; i < Object.getOwnPropertyNames(req['body'])['length']; i++) {
                let propertyName = Object.getOwnPropertyNames(req['body'])[i];
                index[propertyName] = Object.getOwnPropertyDescriptors(req['body'])[propertyName]['value'];
            }
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
                    // enctype : 'multipart/form-data',
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
            // session.destroy();
            // return res.redirect(urlPath(prefix, 'login'));
        },
    }
    return Action;
};

const getAuthenticate = (object) => {
    const Action = {
        authenticate : (req, res, next) => {
            // const {
            //     email,
            //     password
            // } = req['body'];
            // const index = currentList.find((index) => {
            //     return index['email'] == email;
            // });
            // const allNames = 'save';
            // if (!validate(index)) {
            //     return res.render(viewName(prefix, allNames), {
            //         form : {
            //             action : urlPath(prefix, 'authenticate'),
            //             enctype : '',
            //             method : 'POST',
            //         },
            //         formElement : create,
            //         inputType : inputType,
            //         notfound : true,
            //         pageTitle : pageTitle(prefix, allNames),
            //         capitalize,
            //         cleaner,
            //         currency,
            //         roman,
            //         validate,
            //         session,
            //     });
            // }
            // if (!bcrypt.compareSync(password, currentList['password'])) {
            //     return res.render(viewName(prefix, allNames), {
            //         form : {
            //             action : urlPath(prefix, 'authenticate'),
            //             enctype : '',
            //             method : 'POST',
            //         },
            //         formElement : create,
            //         inputType : inputType,
            //         notfound : true,
            //         pageTitle : pageTitle(prefix, allNames),
            //         capitalize,
            //         cleaner,
            //         currency,
            //         roman,
            //         session,
            //         validate,
            //     });
            // }
            // const {
            //     password : pass,
            //     ...without
            // } = currentList; 
            // req.session.clients = without;
            // allNames = 'list';
            // return res.render(viewName(prefix, allNames), {
            //     pageTitle : pageTitle(prefix, allNames),
            //     session,
            // });
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