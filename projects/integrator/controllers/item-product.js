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