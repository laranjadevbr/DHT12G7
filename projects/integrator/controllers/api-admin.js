const {
    Public,
    Order,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Public,
        includeAlias : 'order',
        includeName : Order,
        prefix : 'api-admin',
    }),
};