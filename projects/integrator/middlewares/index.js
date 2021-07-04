let {
    getJsModify,
    getJsonModify,
} = require('../utils');
const middlewares = {
    report : (req, res, next) => {
        getJsonModify({
            array : [
                'logs',
                'report.json',
            ],
            url : req['url'],
        })
        getJsModify({
            array : [
                'logs',
                'report.js',
            ],
            require : '../logs/report',
            url : req['url'],
            variable : 'report',
        });
        next();
    },
};
module.exports = middlewares;