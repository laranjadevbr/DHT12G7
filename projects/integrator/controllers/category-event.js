const {
    Category,
    Event,
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
        includeAlias : 'event',
        includeName : Event,
        prefix : 'category-event',
        // ...isThere(['bulkmakers', 'category.js']) ? {
        //     bulkMaker : require('../bulkmakers/category'),
        // } : { },
    }),
};