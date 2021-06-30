const {
    Category,
    Service,
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
        includeAlias : 'service',
        includeName : Service,
        prefix : 'category-service',
        ...isThere(['bulkmakers', 'category-service.js']) ? {
            bulkMaker : require('../bulkmakers/category-service')
        } : {
        },
    }),
};