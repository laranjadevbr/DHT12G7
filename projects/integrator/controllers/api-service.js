const {
    Service,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/api');
module.exports = {
    ...everyoneApis({
        modelName : Service,
        prefix : 'api-service',
    }),
};