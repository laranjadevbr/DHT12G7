let {
    getControllers,
} = require('../utils/controllers/json/public');
module.exports = {
    ...getControllers({
        database : require('../database/json/client'),
        element : 'public',
        prefix : 'json-admin',
        title : 'client',
    }),
};