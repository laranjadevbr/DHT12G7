const {
    Category,
    Service,
} = require('../models');
let {
    isThere,
} = require('../utils');
let {
    everyoneProduct,
} = require('../utils/product');
module.exports = {
    ...everyoneProduct({
        title : 'service',
        modelName : Service,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-service',
        ...isThere(['bulkmakers', 'service.js']) ? {
            bulkMaker : require('../bulkmakers/service'),
        } : { },
    }),
};