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
        title : 'service',
        modelName : Service,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-service',
        ...isThere(['bulkmakers', 'service.js']) ? {
            bulkMaker : require('../bulkmakers/service'),
        } : { },
    }),
};