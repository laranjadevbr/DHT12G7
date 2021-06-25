const {
    Category,
    Product,
} = require('../models');
let {
    isThere,
} = require('../utils');
let {
    everyoneItem,
} = require('../utils/item');
module.exports = {
    ...everyoneItem({
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