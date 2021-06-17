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
const viewMaker = (method, allNames) => {
    return method.render(viewName('/', allNames), {
        index : require('../database/recipe'),
        script : script(allNames),
        capitalize,
        cleaner,
        currency,
        roman,
        session,
        validate,
    });
};
const action = {
    accordion : (req, res, next) => {
        viewMaker(res, 'accordion');
    },
    cards : (req, res, next) => {
        viewMaker(res, 'cards');
    },
    index : (req, res, next) => {
        viewMaker(res, 'index');
    },
    maps : (req, res, next) => {
        viewMaker(res, 'maps');
    },
};
module.exports = action;