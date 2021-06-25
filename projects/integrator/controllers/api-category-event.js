const {
    Category,
    Event,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/api');
module.exports = {
    ...everyoneApis({
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'api-category-event',
    }),
};