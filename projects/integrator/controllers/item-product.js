const {
    Category,
    Product,
} = require('../models');
let {
    isThere,
} = require('../utils');
let {
    everyoneProduct,
} = require('../utils/product');
module.exports = {
    ...everyoneProduct({
        title : 'product',
        modelName : Product,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-product',
        ...isThere(['bulkmakers', 'product.js']) ? {
            bulkMaker : require('../bulkmakers/product'),
        } : { },
    }),
};