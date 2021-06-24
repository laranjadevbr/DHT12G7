const {
    Event,
} = require('../models');
const {
    everyoneApis,
} = require('../utils/apis');
module.exports = {
    ...everyoneApis({
        modelName : Event,
        prefix : 'api-event',
    }),
};