const {
    Category,
    Service,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Category,
        includeAlias : 'service',
        includeName : Service,
        prefix : 'api-category-service',
    }),
};