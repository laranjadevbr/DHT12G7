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
        element : 'category',
        modelName : Category,
        includeAlias : 'product',
        includeName : Product,
        prefix : 'category-product',
        ...isThere(['bulkmakers', 'category-product.js']) ? {
            bulkMaker : require('../bulkmakers/category-product')
        } : { },
    }),
};