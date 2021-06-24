const {
    Category,
    Event,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : '/api-category-event/',
    }),
};