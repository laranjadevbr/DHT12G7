const {
    Category,
    Product,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Category,
        includeAlias : 'product',
        includeName : Product,
        prefix : '/api-category-product/',
    }),
};