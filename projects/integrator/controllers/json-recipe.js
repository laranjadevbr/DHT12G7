const {
    forms : {
        service : {
            create,
            edit,
            view,
        }
    },
    names : {
        service : item,
    }
} = require('../database/elements');
const {
    inputType : inputType,
} = option = require('../database/options');
const bcrypt = require('bcrypt');
const currentList = require('../database/clients');
const jsonVariable = 'recipe';
const jsonArchive = jsonVariable + '.js';
const jsonFolder = 'database';
const prefix = '/json/recipe/';
const {
    capitalize,
    cleaner,
    currency,
    dismember,
    getCNPJ,
    getCPF,
    getNumber,
    getPhone,
    getRandomDate,
    getRandomInt,
    navbar,
    onlyNumbers,
    pageTitle,
    plural,
    readjust,
    roman,
    saver,
    script,
    urlPath,
    validate,
    viewName,
} = require('../utils');
const session = (req, res, next) => {
    return req.session.user;
};
module.exports = {
    index : (req, res, next) => {
        return res.redirect(urlPath(prefix, 'menu'));
    },
    all : (req, res, next) => {
        const { page = 1 } = req.query;
        const {
            full : fullPage,
            list : listPage,
            next : nextPage,
            prev : prevPage
        } = navbar(page, 2, currentList);
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : listPage,
            item : item,
            inputType : inputType,
            nextPage : nextPage,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            prevPage : prevPage,
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    one : (req, res, next) => {
        const { id } = req['params'];
        const index = currentList.find((index) => {
            return index['id'] == id;
        });
        const allNames = 'one';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'update') + '/' + id,
                enctype : '',
                method : 'POST'
            },
            btnTitle : allNames,
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    create : (req, res, next) => {
        const allNames = 'create';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'save'),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    edit : (req, res, next) => {
        const { id } = req['params'];
        const index = currentList.find((index) => {
            return index['id'] == id;
        });
        const allNames = 'edit';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'update') + '/' + id,
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    store : (req, res, next) => {
        currentList.push({
            active : true,
            id : Number(currentList[currentList['length'] - 1]['id']) + 1,
            ...req.body,
        });
        saver(currentList, jsonVariable, jsonFolder, jsonArchive);
        return res.redirect(urlPath(prefix, 'menu'));
    },
    update : (req, res, next) => {
        const { id } = req['params'];
        const {
            name,
            ingredient,
            mode,
            cost,
            time,
        } = req['body'];
        const index = currentList.find((index) => {
            return index['id'] == id;
        });
        index.active = true;
        index.id = id;
        index.name = name;
        index.ingredient = ingredient;
        index.mode = mode;
        index.cost = cost;
        index.time = time;
        saver(currentList, jsonVariable, jsonFolder, jsonArchive);
        return res.redirect(urlPath(prefix, 'menu'));
    },
    destroy : (req, res, next) => {
        let { id } = req['params'];
        const index = currentList.filter((index) => {
            return index['id'] != id;
        });
        saver(index, jsonVariable, jsonFolder, jsonArchive);
        const allNames = 'success';
        return res.render(allNames, {
            pageMessage : 'the file was deleted successfully!',
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    menu : (req, res, next) => {
        const { page = 1 } = req.query;
        const {
            full : fullPage,
            list : listPage,
            next : nextPage,
            prev : prevPage
        } = navbar(page, 2, currentList);
        const allNames = 'menu';
        return res.render(viewName(prefix, allNames), {  
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : listPage,
            item : item,
            inputType : inputType,
            nextPage : nextPage,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            prevPage : prevPage,
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    success : (req, res, next) => {
        let allNames = 'success';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
};