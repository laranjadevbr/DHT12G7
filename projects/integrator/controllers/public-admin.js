const {
    Public,
    Order,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/public');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        element : 'public',
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'public-admin',
        ...isThere(['bulkmakers', 'public.js']) ? { bulkMaker : require('../bulkmakers/public') } : { },
    }),
};