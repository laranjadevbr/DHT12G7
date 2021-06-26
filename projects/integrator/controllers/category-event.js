const {
    Category,
    Event,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/item');
module.exports = {
    ...getControllers({
        element : 'category',
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'category-event',
    }),
};