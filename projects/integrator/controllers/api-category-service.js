const {
    Category,
    Service,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Category,
        includeAlias : 'service',
        includeName : Service,
        prefix : 'api-category-service',
    }),
};