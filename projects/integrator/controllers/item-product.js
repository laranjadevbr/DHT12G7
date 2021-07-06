const {
    Category,
    Event,
    Order,
    Product,
    Public,
    Service,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/item');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        element : 'product',
        modelName : Product,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-product',
        ...isThere([ 'bulkmakers', 'item-product.js' ]) ? {
            bulkMaker : require('../bulkmakers/item-product')
        } : {
        },
    }),
};