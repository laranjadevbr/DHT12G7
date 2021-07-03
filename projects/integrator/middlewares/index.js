const fs = require('fs');
const urlJoin = require('url-join');
const middlewares = {
    report : (req, res, next) => {        
        // JSO : JSON.stringify()
        // VAR : JSON.parse()
        const contentString = require('../logs/report');
        contentString.push({
            date : new Date().toISOString(),
            url : req['url'],
        });
        const contentFilePath = urlJoin([ 'logs', 'report.js', ]);
        fs.writeFileSync(contentFilePath, 'const report = ');
        fs.appendFileSync(contentFilePath, JSON.stringify(contentString));
        fs.appendFileSync(contentFilePath, ';');
        fs.appendFileSync(contentFilePath, 'module.exports = report;');
        next();
    },
};
module.exports = middlewares;