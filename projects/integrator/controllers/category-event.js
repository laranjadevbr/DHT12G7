const {
    Category,
    Event,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/item');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
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