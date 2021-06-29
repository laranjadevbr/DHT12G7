const {
    Event,
    Category,
    Public,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Event,
        // includeAlias : 'category',
        // includeName : Category,
        includeAlias : 'public',
        includeName : Public,
        prefix : 'api-event',
    }),
};