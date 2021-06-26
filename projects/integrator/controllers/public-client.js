const {
    Public,
    Order,
} = require('../models');
let {
    everyonePublic,
} = require('../utils/public');
module.exports = {
    ...everyonePublic({
        title : 'public',
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'public-client',
    }),
};