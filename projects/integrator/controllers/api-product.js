const {
    Product,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Product,
        prefix : 'api-product',
    }),
};