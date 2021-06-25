const {
    Public,
    Order,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/api');
module.exports = {
    ...everyoneApis({
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'api-admin',
    }),
};