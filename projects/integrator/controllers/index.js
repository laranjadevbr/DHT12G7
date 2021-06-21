const {
    forEveryone,
    getPageTitle,
    getScript,
    getViewName,
} = require('../utils');
const database = require('../database/recipe');
const action = {
    accordion : (req, res, next) => {
        const allNames = 'accordion';
        return res.render(getViewName('/', allNames), {
            index : database,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    cards : (req, res, next) => {
        const allNames = 'cards';
        return res.render(getViewName('/', allNames), {
            index : database,
            pageTitle : getPageTitle('/', allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    index : (req, res, next) => {
        const allNames = 'index';
        return res.render(getViewName('/', allNames), {
            index : database,
            pageTitle : getPageTitle('/', allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    maps : (req, res, next) => {
        const allNames = 'maps';
        return res.render(getViewName('/', allNames), {
            index : database,
            pageTitle : getPageTitle('/', allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
};
module.exports = action;