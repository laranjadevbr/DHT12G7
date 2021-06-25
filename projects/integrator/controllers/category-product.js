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
        title : 'category',
        modelName : Category,
        includeAlias : 'product',
        includeName : Product,
        prefix : 'category-product',
        ...isThere(['bulkmakers', 'category.js']) ? {
            bulkMaker : require('../bulkmakers/category'),
        } : { },
    }),
};