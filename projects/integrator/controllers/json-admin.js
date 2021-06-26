let {
    getControllers,
} = require('../utils/controllers/json/public');
module.exports = {
    ...getControllers({
        title : 'public',
        prefix : 'json-admin',
    }),
};