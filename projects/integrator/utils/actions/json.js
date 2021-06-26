let {
    everyoneView,
    getFormHeader,
    getScript,
    getURLPath,
    JSONModify,
    JSONPagination,
    urlJoin,
} = require('..');

const root = [
    '../..',
    'database',
];

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
            const database = object['database'];
            return res.render('menu', {
                index : JSONPagination({
                    array : database,
                    limit : 2,
                    offset : page,
                })['listPage'],
                item : require(urlJoin([
                    ...root,
                    'elements',
                ]))['name'][object['element']],
                pageTitle : object['prefix'].split('-').join(' ') + ' all',
                pathPrefix : object['prefix'].split('-').join('/'),
                script : getScript('all'),
                ...everyoneView(),
                ...JSONPagination({
                    array : database,
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
            const database = object['database'];
            const index = database.find((index) => {
                return index['id'] == id;
            });
            return res.render('form', {
                btnTitle : 'come back',
                formElement : require(urlJoin([
                    ...root,
                    'elements',
                ]))['form'][object['element']]['view'],
                index : index,
                inputType : require(urlJoin([
                    ...root,
                    'options',
                ]))['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' one',
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
            const database = object['database'];
            const index = database.find((index) => {
                return index['id'] == id;
            });
            return res.render('form', {
                btnTitle : 'update',
                formElement : require(urlJoin([
                    ...root,
                    'elements',
                ]))['form'][object['element']]['edit'],
                index : index,
                inputType : require(urlJoin([
                    ...root,
                    'options',
                ]))['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' edit',
                script : getScript('edit'),
                ...everyoneView(),
                ...getFormHeader({
                    prefix : object['prefix'].split('-').join('/'),
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
                formElement : require(urlJoin([
                    ...root,
                    'elements',
                ]))['form'][object['element']]['create'],
                inputType : require(urlJoin([
                    ...root,
                    'options',
                ]))['inputType'],
                pageTitle : object['prefix'].split('-').join(' ') + ' create',
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
            const database = object['database'];
            req['body']['password'] = getHash(req['body']['password']);
            const index = {
                active : true,
                id : database[database['length'] - 1]['id'] + 1,
                ...req['body'],
            };
            database.push(index);
            JSONModify({
                name : 'clients',
                content : database,
                path : [
                    ...root,
                    'json',
                    'clients.js',
                ],
            });
            return res.send(index);
        },
    }
    return Action;
};

const getUpdate = (object) => {
    const Action = {
        update : (req, res, next) => {
        //     const { id } = req['params'];
        //     const {
        //         name,
        //         ingredient,
        //         mode,
        //         cost,
        //         time,
        //     } = req['body'];
        //     const index = currentList.find((index) => {
        //         return index['id'] == id;
        //     });
        //     index.active = true;
        //     index.id = id;
        //     index.name = name;
        //     index.ingredient = ingredient;
        //     index.mode = mode;
        //     index.cost = cost;
        //     index.time = time;
        //     saver(currentList, jsonVariable, jsonFolder, jsonArchive);
        //     return res.redirect(urlPath(prefix, 'menu'));
        },
    }
    return Action;
};

const getDestroy = (object) => {
    const Action = {
        destroy : (req, res, next) => {
            const { id } = req['params'];
            const database = object['database'];
            const index = database.filter((index) => {
                return index['id'] !== id;
            });
            JSONModify({
                name : 'clients',
                content : index,
                path : [
                    ...root,
                    'json',
                    'clients.js',
                ],
            });
            return res.redirect(getURLPath({
                prefix : object['prefix'].split('-').join('/'),
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
            // const allNames = 'login';
            // return res.render(viewName(prefix, allNames), {
            //     form : {
            //         action : urlPath(prefix, 'authenticate'),
            //         enctype : '',
            //         method : 'POST',
            //     },            
            //     btnTitle : allNames,
            //     formElement : login,
            //     inputType : inputType,
            //     pageTitle : pageTitle(prefix, allNames),
            //     capitalize,
            //     cleaner,
            //     currency,
            //     roman,
            //     session,
            //     validate,
            // });
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
    getOne,
    getSearch,
    getStore,
    getUpdate,
};