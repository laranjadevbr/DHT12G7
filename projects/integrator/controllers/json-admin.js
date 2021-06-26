let {
    getControllers,
} = require('../utils/controllers/json/public');
module.exports = {
    ...getControllers({
        element : 'public',
        prefix : 'json-admin',
        database : require('../database/json/clients'),
    }),
};