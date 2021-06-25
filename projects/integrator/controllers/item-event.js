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
        title : 'event',
        modelName : Event,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-event',
        ...isThere(['bulkmakers', 'event.js']) ? {
            bulkMaker : require('../bulkmakers/event'),
        } : { },
    }),
};