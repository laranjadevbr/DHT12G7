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
        title : 'category',
        modelName : Category,
        includeAlias : 'service',
        includeName : Service,
        prefix : 'category-service',
        // ...isThere(['bulkmakers', 'category.js']) ? {
        //     bulkMaker : require('../bulkmakers/category'),
        // } : { },
    }),
};