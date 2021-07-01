const routes = require('./routes');

const api = routes['api'];
const index = routes['index'];
const jsonItem = routes['jsonItem'];
const jsonPublic = routes['jsonPublic'];
const lab = routes['lab'];
const category = routes['category'];
const item = routes['item'];
const public = routes['public'];

const controls = [
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
const router = require('express').Router();
const database = require('../middlewares')['database'];
const url = require('../middlewares')['url'];
let getRouter = (controller, URLPath, object) => {
    for (let i = 0; i < object['length']; i++) {
        router[object[i]['method']](
            String(URLPath + object[i]['title'] + object[i]['param']),
            database,
            controller[object[i]['control']],
        );
    }
};
const {
    isThere,
} = require('../utils');
for (let i = 0; i < controls['length']; i++) {
    if (isThere(['controllers', controls[i]['path'] + '.js'])) {
        const controller = require('../controllers/' + controls[i]['path']);
        const URLPath = controls[i]['path'] !== 'index' ?
            controls[i]['path'] ? '/' + controls[i]['path'].split('-').join('/') + '/' : '/'
        : '/';
        const object = controls[i]['control'];
        getRouter(controller, URLPath, object);
    };
};
module.exports = router;