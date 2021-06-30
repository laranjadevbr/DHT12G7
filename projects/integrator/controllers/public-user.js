const {
    Public,
    Order,
} = require('../models');
let {
    getControllers,
} = require('../utils/controllers/database/public');
module.exports = {
    ...getControllers({
        element : 'public',
        modelName : Public,
        // includeAlias : 'order',
        // includeName : Order,
        prefix : 'public-user',
    }),
};