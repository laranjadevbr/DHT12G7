const {
    everyoneView,
    getScript,
} = require('../utils');
const viewsAction = (pageName) => {
    const Action = {
        [pageName] : (req, res, next) => {
            return res.render(pageName, {
                pageTitle : pageName,
                script : getScript(pageName),
                ...everyoneView(),
            });
        },
    };
    return Action;
};
const Action = {
    ...viewsAction('index'),
    ...viewsAction('accordion'),
    ...viewsAction('maps'),
};
module.exports = Action;