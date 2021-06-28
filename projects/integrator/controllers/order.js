const {
    Order,
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
        element : 'order',
        modelName : Order,
        includeAlias : 'product',
        includeName : Product,
        prefix : 'order',
        ...isThere(['bulkmakers', 'order.js']) ? { bulkMaker : require('../bulkmakers/order') } : { },
    }),
};