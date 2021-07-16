const { check, validationResult, body } = require('express-validator');
const expressValidator = [
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
        for (let i = 0; i < index['length']; i++) {
            return index[i]['email'] !== email ? true : false;
        };
    }).withMessage('email already registered!'),
    check('password').isLength({
        min : 6,
    }).withMessage('password field error!'),
];

const { isThere } = require('../utils');
const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, urlJoin([
            'database',
            'uploads',
        ]));
    },
    filename : (req, file, cb) => {
        // cb(null, file['fieldname'] + '-' + Date.now());
        cb(null, file['originalname']);
    },
});
const upload = multer({
    storage : storage
});

const middlewareReport = require('../middlewares')['report'];
const router = require('express').Router();
const routes = require('./routes');
const urlJoin = require('url-join');

const api = routes['api'];
const index = routes['index'];
const jsonItem = routes['jsonItem'];
const jsonPublic = routes['jsonPublic'];
const lab = routes['lab'];
const category = routes['category'];
const item = routes['item'];
const public = routes['public'];

const control = [
    { control : api, path : 'api-admin', },
    { control : api, path : 'api-category-event', },
    { control : api, path : 'api-category-product', },
    { control : api, path : 'api-category-service', },
    { control : api, path : 'api-event', },
    { control : api, path : 'api-product', },
    { control : api, path : 'api-service', },
    
    { control : index, path : 'index', },
    { control : lab, path : 'lab', },

    { control : category, path : 'category-event', },
    { control : category, path : 'category-product', },
    { control : category, path : 'category-service', },

    { control : item, path : 'order', },
    { control : item, path : 'item-event', },
    { control : item, path : 'item-product', },
    { control : item, path : 'item-service', },
    
    { control : public, path : 'public-admin', },
    { control : public, path : 'public-client', },
    { control : public, path : 'public-user', },

    { control : jsonItem, path : 'json-recipe', },
    { control : jsonPublic, path : 'json-admin', },
    { control : jsonPublic, path : 'json-client', },
];

let getRouter = (control, URLPath, object) => {
    for (let i = 0; i < object['length']; i++) {
        router[object[i]['method']](
            String(URLPath + object[i]['title'] + object[i]['param']),
            middlewareReport,
            expressValidator,
            upload.any(),
            control[object[i]['control']],
        );
    };
};
for (let i = 0; i < control['length']; i++) {
    if (isThere(['controllers', control[i]['path'] + '.js'])) {
        const controller = require('../controllers/' + control[i]['path']);
        const URLPath = control[i]['path'] !== 'index' ?
            control[i]['path'] ? '/' + control[i]['path'].split('-').join('/') + '/' : '/'
        : '/';
        const object = control[i]['control'];
        getRouter(controller, URLPath, object);
    };
};

module.exports = router;