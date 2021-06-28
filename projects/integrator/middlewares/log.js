const fs = require('fs');
const path = require('path');
const middlewares = {
    URLLog : (req, res, next) => {
        let string = 'access = url => ( ' + req.url + ' ); ';
        fs.appendFileSync(path.join('logs', 'urllog.txt'), string);
        console.log(string);
        next();
    },
    DBLog : (req, res, next) => {
        let string = 'record created = url => ( ' + req.url + ' ); ';
        fs.appendFileSync(path.join('logs', 'dblog.txt'), string);
        console.log(string);
        next();
    },
};
module.exports = middlewares;