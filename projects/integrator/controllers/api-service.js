const {
    Service,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Service,
        prefix : '/api-service/',
    }),
};