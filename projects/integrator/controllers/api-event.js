const {
    Event,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/api');
module.exports = {
    ...everyoneApis({
        modelName : Event,
        prefix : 'api-event',
    }),
};