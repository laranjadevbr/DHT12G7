const {
    Category,
    Event,
    Order,
    Product,
    Public,
    Service,
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
        includeAlias : 'product',
        includeName : Product,
        prefix : 'public-admin',
        ...isThere([ 'bulkmakers', 'public.js' ]) ? {
            bulkMaker : require('../bulkmakers/public')
        } : {
        },
    }),
};