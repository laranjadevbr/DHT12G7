const {
    Order,
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