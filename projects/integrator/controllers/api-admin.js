const {
    Public,
    Order,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : '/api-admin/',
    }),
};