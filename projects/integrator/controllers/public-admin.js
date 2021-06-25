const {
    Public,
    Order,
} = require('../models');
let {
    isThere,
} = require('../utils');
let {
    everyonePublic,
} = require('../utils/public');
module.exports = {
    ...everyonePublic({
        title : 'public',
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'public-admin',
        ...isThere(['bulkmakers', 'public.js']) ? {
            bulkMaker : require('../bulkmakers/public'),
        } : { },
    }),
};