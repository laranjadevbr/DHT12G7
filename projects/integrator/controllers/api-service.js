const {
    Service,
    Category,
    Public,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Service,
        // includeAlias : 'category',
        // includeName : Category,
        includeAlias : 'public',
        includeName : Public,
        prefix : 'api-service',
    }),
};