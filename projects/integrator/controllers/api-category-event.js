const {
    Category,
    Event,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'api-category-event',
    }),
};