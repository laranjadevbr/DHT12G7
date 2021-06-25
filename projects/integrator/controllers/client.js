const {
    Public,
    Order,
} = require('../models');
let {
    everyonePublic,
} = require('../utils/public');
module.exports = {
    ...everyonePublic({
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'client',
        bulkMaker : require('../bulkmakers/public'),
    }),
};