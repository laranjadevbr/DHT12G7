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