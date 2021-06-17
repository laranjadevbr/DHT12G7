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
    json_admin,
    json_client,
    json_recipe,
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
    { control : index, path : '', },
    { control : json_admin, path : 'json-admin', },
    { control : json_client, path : 'json-client', },
    { control : json_recipe, path : 'json-recipe', },
    { control : lab, path : 'lab', },
    { control : order, path : 'order', },
    { control : product, path : 'product', },
    { control : service, path : 'service', },
    { control : user, path : 'user', },
];
let getRouter = (method, prefix, object) => {
    for (let i = 0; i < object['length']; i++)
        router[object[i]['method']](
            String(prefix + object[i]['pathTitle'] + object[i]['pathParam']),
            method[object[i]['control']],
            );
};
for (let i = 0; i < controls['length']; i++) {
    if (isThere('controllers', controls[i]['path'], 'js'))
        getRouter(
            require('../controllers/' + controls[i]['path']),
            controls[i]['path'] ? '/' + controls[i]['path'].split('-').join('/') + '/' : '/',
            controls[i]['control']
            );
}
module.exports = router;