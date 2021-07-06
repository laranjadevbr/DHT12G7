const {
    Category,
    Event,
    Order,
    Product,
    Public,
    Service,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/item');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        element : 'event',
        modelName : Event,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-event',
        ...isThere([ 'bulkmakers', 'item-event.js' ]) ? {
            bulkMaker : require('../bulkmakers/item-event')
        } : {
        },
    }),
};