let {
    getJsModify,
    getJsonModify,
} = require('../utils');
const middlewares = {
    report : (req, res, next) => {
        const array = [
            'logs',
        ];
        const push = {
            date : new Date().toISOString(),
            url : req['url'],
        };
        getJsModify({
            array : [
                ...array,
                'report.js',
            ],
            push : push,
            require : '../logs/report',
            variable : 'report',
        });
        getJsonModify({
            array : [
                ...array,
                'report.json',
            ],
            push : push,
        });
        next();
    },
};
module.exports = middlewares;