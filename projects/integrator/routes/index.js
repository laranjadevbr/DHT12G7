const routes = require('./routes');
const api = routes['api'];
const index = routes['index'];
const jsonItem = routes['jsonItem'];
const jsonPublic = routes['jsonPublic'];
const lab = routes['lab'];
const product = routes['product'];
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
    { control : product, path : 'category-event', },
    { control : product, path : 'category-product', },
    { control : product, path : 'category-service', },
    { control : product, path : 'order', },
    { control : product, path : 'item-event', },
    { control : product, path : 'item-product', },
    { control : product, path : 'item-service', },
    { control : public, path : 'public-admin', },
    { control : public, path : 'public-client', },
    { control : public, path : 'public-user', },
    { control : jsonItem, path : 'json-recipe', },
    { control : jsonPublic, path : 'json-admin', },
    { control : jsonPublic, path : 'json-client', },
];
const router = require('express').Router();
let getRouter = (controller, URLPath, object) => {
    for (let i = 0; i < object['length']; i++) {
        router[object[i]['method']](
            String(URLPath + object[i]['title'] + object[i]['param']),
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