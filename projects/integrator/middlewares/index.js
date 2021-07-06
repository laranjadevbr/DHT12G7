let {
    addJsDatabase,
    addJsonDatabase,
} = require('../utils');
const middlewares = {
    report : (req, res, next) => {
        // const content = {
        //     attachment : {
        //         date : new Date().toISOString(),
        //         url : req['url'],
        //     },
        //     require : [
        //         'database',
        //         'logs',
        //     ],
        //     title : 'report',
        // }
        // addJsDatabase({
        //     ...content,
        // });
        // addJsonDatabase({
        //     ...content,
        // });
        next();
    },
};
module.exports = middlewares;