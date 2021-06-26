const {
    Event,
} = require('../models');
const {
    getControllers,
} = require('../utils/controllers/database/api');
module.exports = {
    ...getControllers({
        modelName : Event,
        prefix : 'api-event',
    }),
};