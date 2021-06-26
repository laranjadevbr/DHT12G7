let {
    everyoneView,
    getFormHeader,
    getModelParams,
    getScript,
    getURLPath,
    isEqual,
} = require('./');
let {
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
} = require('./action');
const everyonePublic = (object) => {
    const Action = {
        ...getIndex(object),
        ...getAll(object),
        ...getOne(object),
        ...getCreate(object),
        ...getStore(object),
        ...getEdit(object),
        ...getUpdate(object),
        ...getDestroy(object),
        ...getBulk(object),
        ...getSearch(object),

        login : async (req, res, next) => {
            return res.render('form', {
                btnTitle : 'login',
                formElement : require('../database/elements')['form'][object['title']]['login'],
                inputType : require('../database/options')['inputType'],
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
                    formElement : require('../database/elements')['form'][object['title']]['login'],
                    inputType : require('../database/options')['inputType'],
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

        logout : async (req, res, next) => {
            req.session.destroy();
            return res.redirect('/');
        },
        
    }
    return Action;
};
module.exports = {
    everyonePublic,  
};