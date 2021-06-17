const {
    isLast,
    isThis,
} = require('../utils');
let getPathTitle = getControl = (index) => {
    return isLast(index, '?') ? index.substr(0, index['length'] - 1) : index;
};
let getPathParam = (index) => {
    return isLast(index, '?') ? '/:id?' : '';
};
let getRouteParams = (route, method) => {
    let result = [];
    for (let i = 0; i < route['length']; i++)
        result.push({
            method : method,
            pathTitle : isThis(route[i], 'string') ? getPathTitle(route[i]) : getPathTitle(route[i][0]),
            pathParam : isThis(route[i], 'string') ? getPathParam(route[i]) : getPathParam(route[i][0]),
            control : isThis(route[i], 'string') ? getControl(route[i]) : getControl(route[i][1]),
        });
    return result;
};
let views = [
    ...getRouteParams([
        ['', 'index'],
        'all',
        'one?',
    ], 'get'),
];
let changes = [
    ...getRouteParams([
        'create',
        'edit?',
    ], 'get'),
    ...getRouteParams([
        ['create', 'store'],
    ], 'post'),
    ...getRouteParams([
        ['edit?', 'update'],
    ], 'put'),
    ...getRouteParams([
        ['delete?', 'destroy'],
    ], 'delete'),
];
let log = [
    ...getRouteParams([
        'login',
        'logout'
    ], 'get'),
    ...getRouteParams([
        'authenticate'
    ], 'post'),
];
module.exports = {
    admin : [
        ...changes,
        ...views,
        ...log,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    api : [
        ...views,
    ],
    client : [
        ...changes,
        ...views,
        ...log,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    user : [
        ...changes,
        ...views,
        ...log,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    category : [
        ...changes,
        ...views,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    order : [
        ...changes,
        ...views,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    product : [
        ...changes,
        ...views,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    service : [
        ...changes,
        ...views,
        ...getRouteParams([
            'bulk',
            'search',
        ], 'get'),
    ],
    index : [
        ...getRouteParams([
            ['', 'index'],
            'accordion',
            'cards',
            'index',
            'maps',
        ], 'get'),
    ],
    json_admin : [
        ...changes,
        ...views,
        ...log,
    ],
    json_client : [
        ...changes,
        ...views,
        ...log,
    ],
    json_recipe : [
        ...changes,
        ...views,
        ...getRouteParams([
            'menu',
            'success',
        ], 'get'),
    ],
    lab : [
        ...getRouteParams([
            'a',
            'b',
            'c?',
            'd?',
            'e',
            'f?',
            'g',
            'h', 
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ], 'get'),
    ],
};