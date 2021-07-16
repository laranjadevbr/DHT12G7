let {
    addJsDatabase,
    addJsonDatabase,
} = require('../utils');
const middlewares = {
    report : (req, res, next) => {

        const newPush = {
            attachment : {
                date : new Date().toISOString(),
                url : req['url'],
            },
            require : [
                'database',
                'logs',
            ],
            title : 'report',
        };

        // addJsDatabase({
        //     ...newPush,
        // });

        // addJsonDatabase({
        //     ...newPush,
        // });

        next();
    },
};
module.exports = middlewares;