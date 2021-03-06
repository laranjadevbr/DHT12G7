const {
    forAllPages,
    getScriptModule,
} = require('../utils');
const getViewsAction = (pageName) => {
    const Action = {
        [pageName] : (req, res, next) => {
            return res.render(pageName, {
                pageTitle : pageName,
                ...getScriptModule(pageName),
                ...forAllPages(),
            });
        },
    };
    return Action;
};
const Action = {
    ...getViewsAction('index'),
    ...getViewsAction('accordion'),
    ...getViewsAction('maps'),
};
module.exports = Action;