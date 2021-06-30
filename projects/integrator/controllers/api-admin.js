const {
    Public,
    Event,
    Product,
    Service,
    Order,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Public,
        // includeAlias : 'order',
        // includeName : Order,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'api-admin',
    }),
};