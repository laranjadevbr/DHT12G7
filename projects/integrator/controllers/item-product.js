const {
    Category,
    Product,
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
        ...isThere(['bulkmakers', 'product.js']) ? { bulkMaker : require('../bulkmakers/product') } : { },
    }),
};