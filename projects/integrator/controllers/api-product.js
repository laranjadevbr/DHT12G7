const {
    Product,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Product,
        prefix : 'api-product',
    }),
};