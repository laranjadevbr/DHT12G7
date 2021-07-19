const fs = require('fs');
const urlJoin = require('url-join');
const { 
    check,
    validationResult,
    body,
} = require('express-validator');
let {
    addJsDatabase,
    addJsonDatabase,
} = require('../utils');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        let pathName = urlJoin([
            'public',
            'images',
        ]);
        cb(null, pathName);
    },
    filename : (req, file, cb) => {
        let fileName = '';
        // fileName += file['fieldname'];
        // fileName += '-';
        fileName += Date.now();
        fileName += path.extname(file['originalname']);
        cb(null, fileName);
    },
});
const middleware = {
    upload : multer({
        storage : storage,
    }),
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
        addJsonDatabase({
            ...newPush,
        });
        next();
    },
    authenticate : (req, res, next) => {
        if (typeof req['session']['client'] === 'undefined') {
            return res.send('you need to be logged!');
        } else {
            next();
        }
    },
    validator : (req, res, next) => {
        return [
            check('name').isInt({
                min : 3,
                max : 99,
            }).withMessage('name field error!'),
            check('email').isEmail().withMessage('email field error!'),
            body('email').custom((email) => {
                const index = JSON.parse(fs.readFileSync(urlJoin([
                    'database',
                    'texts',
                    'client.json',
                ])));
                for (let i = 0; i < index['length']; i++)
                    return index[i]['email'] !== email;
            }).withMessage('email already registered!'),
            check('password').isLength({
                min : 6,
            }).withMessage('password field error!'),
            check('password').isEmpty().withMessage('password field is empty!'),
        ];
    }
};
module.exports = middleware;