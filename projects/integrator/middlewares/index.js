const fs = require('fs');
const path = require('path');
const middlewares = {
    url : (req, res, next) => {
        let string = req['url'] + '; ';
        fs.appendFileSync(path.join('logs', 'url.txt'), string);
        next();
    },
    database : (req, res, next) => {
        let string = req['url'] + '; ';
        fs.appendFileSync(path.join('logs', 'database.txt'), string);
        next();
    },
};
module.exports = middlewares;
