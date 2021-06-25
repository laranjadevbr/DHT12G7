const {
    Category,
    Event,
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
        includeAlias : 'event',
        includeName : Event,
        prefix : 'category-event',
        // ...isThere(['bulkmakers', 'category.js']) ? {
        //     bulkMaker : require('../bulkmakers/category'),
        // } : { },
    }),
};