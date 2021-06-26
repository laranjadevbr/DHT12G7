const {
    Category,
    Service,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/item');
module.exports = {
    ...getControllers({
        element : 'category',
        modelName : Category,
        includeAlias : 'service',
        includeName : Service,
        prefix : 'category-service',
    }),
};