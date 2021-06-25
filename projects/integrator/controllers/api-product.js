const {
    Product,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/api');
module.exports = {
    ...everyoneApis({
        modelName : Product,
        prefix : 'api-product',
    }),
};