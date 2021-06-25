const {
    Category,
    Service,
} = require('../models');
let {
    isThere,
} = require('../utils');
let {
    everyoneItem,
} = require('../utils/item');
module.exports = {
    ...everyoneItem({
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