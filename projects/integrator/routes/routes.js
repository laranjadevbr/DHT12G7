const {
    isLast,
    isThis,
} = require('../utils');
let getTitle = getControl = (index) => {
    return isLast(index, '?') ? index.substr(0, index['length'] - 1) : index;
};
let getParam = (index) => {
    return isLast(index, '?') ? '/:id?' : '';
};
let getRoute = (route, method) => {
    const result = [];
    for (let i = 0; i < route['length']; i++)
        result.push({
            method : method,
            title : isThis(route[i], 'string') ? getTitle(route[i]) : getTitle(route[i][0]),
            param : isThis(route[i], 'string') ? getParam(route[i]) : getParam(route[i][0]),
            control : isThis(route[i], 'string') ? getControl(route[i]) : getControl(route[i][1]),
        });
    return result;
};
const view = [
    ...getRoute([
        ['', 'index'],
        'all',
        'one?',
    ], 'get'),
];
const change = [
    ...getRoute([
        'create',
        'edit?',
    ], 'get'),
    ...getRoute([
        ['create', 'store'],
    ], 'post'),
    ...getRoute([
        ['edit?', 'update'],
    ], 'put'),
    ...getRoute([
        ['delete?', 'destroy'],
    ], 'delete'),
];
const log = [
    ...getRoute([
        'authenticate'
    ], 'post'),
    ...getRoute([
        'login',
        'logout'
    ], 'get'),
];
const bulk = [
    ...getRoute([
        'bulk',
    ], 'get'),
];
const search = [
    ...getRoute([
        'search',
    ], 'get'),
];
module.exports = {
    index : [
        ...getRoute([
            ['', 'index'],
            'accordion',
            'cards',
            'index',
            'maps',
        ], 'get'),
    ],
    api : [
        ...view,
    ],
    admin : [
        ...bulk,
        ...change,
        ...log,
        ...search,
        ...view,
    ],
    client : [
        ...bulk,
        ...change,
        ...log,
        ...search,
        ...view,
    ],
    user : [
        ...bulk,
        ...change,
        ...log,
        ...search,
        ...view,
    ],
    category : [
        ...bulk,
        ...change,
        ...search,
        ...view,
    ],
    event : [
        ...bulk,
        ...change,
        ...search,
        ...view,
    ],
    product : [
        ...bulk,
        ...change,
        ...search,
        ...view,
    ],
    service : [
        ...bulk,
        ...change,
        ...search,
        ...view,
    ],
    order : [
        ...bulk,
        ...change,
        ...search,
        ...view,
    ],
    jsonAdmin : [
        ...change,
        ...log,
        ...view,
    ],
    jsonClient : [
        ...change,
        ...log,
        ...view,
    ],
    jsonRecipe : [
        ...change,
        ...view,
        ...getRoute([
            'menu',
            'success',
        ], 'get'),
    ],
    lab : [
        ...getRoute([
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