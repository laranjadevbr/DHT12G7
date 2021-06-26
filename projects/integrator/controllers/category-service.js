const {
    Category,
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