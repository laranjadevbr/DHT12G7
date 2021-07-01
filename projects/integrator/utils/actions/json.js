let {
    everyoneView,
    getFormElement,
    getFormHeader,
    getInputType,
    getItem,
    getMenuSetup,
    getPageTitle,
    getPathPrefix,
    getScriptModule,
    getURLPath,
    JSONModify,
    JSONPagination,
} = require('..');

const getIndex = (object) => {
    const Action = {
        index : (req, res, next) => {
            return res.redirect(getURLPath({ prefix : object['prefix'], suffix : 'all' }));
        },
    }
    return Action;
};

const getAll = (object) => {
    const Action = {
        all : (req, res, next) => {
            const amount = 2;
            const { page = 1 } = req['query'];
            const database = object['database'];
            return res.render('menu', {
                index : JSONPagination({
                    array : database,
                    limit : amount,
                    offset : page,
                })['listPage'],
                ...everyoneView(),
                ...getItem(object['element']),
                ...getMenuSetup(object['prefix']),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'all' }),
                ...getPathPrefix(object['prefix']),
                ...getScriptModule('all'),
                ...JSONPagination({
                    array : database,
                    limit : amount,
                    offset : page,
                }),
            });
        },
    }
    return Action;
};

const getOn = (object) => {
    const Action = {
        on : (req, res, next) => {
            const { id } = req['params'];
            const index = object['database'].find((index) => { return index['id'] == id; });
            return res.render('form', {
                index : index,
                btnTitle : 'come back',
                ...everyoneView(),
                ...getFormElement({ element : object['element'], type : 'view' }),
                ...getInputType(),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'one' }),
                ...getScriptModule('one'),
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
            const index = object['database'].find((index) => { return index['id'] == id; });
            return res.render('form', {
                index : index,
                btnTitle : 'update',
                ...everyoneView(),
                ...getFormElement({ element : object['element'], type : 'edit' }),
                ...getInputType(),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'edit' }),
                ...getScriptModule('edit'),
                ...getFormHeader({
                    prefix : object['prefix'],
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
                ...everyoneView(),
                ...getFormElement({ element : object['element'], type : 'create' }),
                ...getInputType(),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'create' }),
                ...getScriptModule('create'),
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
            const database = object['database'];
            req['body']['password'] = getHash(req['body']['password']);
            const index = {
                active : true,
                id : database[database['length'] - 1]['id'] + 1,
                ...req['body'],
            };
            database.push(index);
            JSONModify({
                name : object['title'],
                content : database,
            });
            return res.send(index);
        },
    }
    return Action;
};

const getUpdate = (object) => {
    const Action = {
        update : (req, res, next) => {
            const { id } = req['params'];
            const index = object['database'].find((index) => { return index['id'] == id; });
            index = { ...req['body'], };
            JSONModify({
                name : object['title'],
                content : index,
            });
            return res.redirect(getURLPath({ prefix : object['prefix'], suffix : 'all' }));
        },
    }
    return Action;
};

const getDestroy = (object) => {
    const Action = {
        destroy : (req, res, next) => {
            const { id } = req['params'];
            const index = object['database'].filter((index) => { return index['id'] != id; });
            JSONModify({
                name : object['title'],
                content : index,
            });
            return res.redirect(getURLPath({ prefix : object['prefix'], suffix : 'all' }));
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
            return res.render('form', {
                btnTitle : 'login',
                ...everyoneView(),
                ...getFormElement({ element : object['element'], type : 'login' }),
                ...getInputType(),
                ...getPageTitle({ prefix : object['prefix'], suffix : 'login' }),
                ...getScriptModule('login'),
                ...getFormHeader({
                    prefix : 'login',
                    suffix : 'authenticate',
                    enctype : '',
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