const router = require('express').Router();
const {
    isThere,
} = require('../utils');
const {
    admin,
    api,
    category,
    client,
    index,
    jsonAdmin,
    jsonClient,
    jsonRecipe,
    lab,
    order,
    product,
    service,
    user,
} = obj = require('./routes');
const controls = [
    { control : admin, path : 'admin', },
    { control : api, path : 'api-admin', },
    { control : api, path : 'api-category', },
    
    { control : api, path : 'api-event', },
    { control : api, path : 'api-product', },
    { control : api, path : 'api-service', },

    { control : category, path : 'category', },
    { control : client, path : 'client', },
    { control : index, path : 'index', },
    { control : jsonAdmin, path : 'json-admin', },
    { control : jsonClient, path : 'json-client', },
    { control : jsonRecipe, path : 'json-recipe', },
    { control : lab, path : 'lab', },
    { control : order, path : 'order', },
    { control : product, path : 'product', },
    { control : service, path : 'service', },
    { control : user, path : 'user', },
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