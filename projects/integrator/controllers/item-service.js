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
        element : 'service',
        modelName : Service,
        includeAlias : 'category',
        includeName : Category,
        prefix : 'item-service',
        ...isThere(['bulkmakers', 'item-service.js']) ? { 
            bulkMaker : require('../bulkmakers/item-service')
        } : {
        },
    }),
};