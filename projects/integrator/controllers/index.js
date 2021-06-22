const {
    forEveryone,
    getScript,
} = require('../utils');
const action = {
    accordion : (req, res, next) => {
        const allNames = 'accordion';
        return res.render(allNames, {
            pageTitle : allNames,
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    cards : (req, res, next) => {
        const allNames = 'cards';
        return res.render(allNames, {
            index : require('../database/json/recipe'),
            pageTitle : allNames,
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    index : (req, res, next) => {
        const allNames = 'index';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    maps : (req, res, next) => {
        const allNames = 'maps';
        return res.render(allNames, {
            pageTitle : allNames,
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
};
module.exports = action;