let {
    getJsModify,
    getJsonModify,
} = require('../utils');
const middlewares = {
    report : (req, res, next) => {
        getJsModify({
            attachment : {
                date : new Date().toISOString(),
                url : req['url'],
            },
            require : [
                'database',
                'logs',
            ],
            title : 'report',
        });
        getJsonModify({
            attachment : {
                date : new Date().toISOString(),
                url : req['url'],
            },
            require : [
                'database',
                'logs',
            ],
            title : 'report',
        });
        next();
    },
};
module.exports = middlewares;