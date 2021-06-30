const {
    Category,
    Event,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/category');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        element : 'category',
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'category-event',
        ...isThere(['bulkmakers', 'category-event.js']) ? {
            bulkMaker : require('../bulkmakers/category-event')
        } : {
        },
    }),
};