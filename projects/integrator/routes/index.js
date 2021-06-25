const router = require('express').Router();
const {
    isThere,
} = require('../utils');
const {
    api,
    index,
    json,
    lab,
    product,
    public,
    recipe,
} = obj = require('./routes');
const controls = [
    { control : api, path : 'api-admin', },

    { control : api, path : 'api-category-event', },
    { control : api, path : 'api-category-product', },
    { control : api, path : 'api-category-service', },

    { control : api, path : 'api-event', },
    { control : api, path : 'api-product', },
    { control : api, path : 'api-service', },

    { control : index, path : 'index', },

    { control : json, path : 'json-admin', },
    { control : json, path : 'json-client', },

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

    { control : recipe, path : 'json-recipe', },
];
let getRouter = (controller, URLPath, object) => {
    for (let i = 0; i < object['length']; i++) {
        router[object[i]['method']](
            String(URLPath + object[i]['title'] + object[i]['param']),
            controller[object[i]['control']],
        );
    }
};
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