const {
    Order,
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
        title : 'order',
        modelName : Order,
        includeAlias : 'product',
        includeName : Product,
        prefix : 'order',
        ...isThere(['bulkmakers', 'order.js']) ? {
            bulkMaker : require('../bulkmakers/order'),
        } : { },
    }),
};