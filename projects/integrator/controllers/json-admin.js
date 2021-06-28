let {
    getControllers,
} = require('../utils/controllers/json/public');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        database : isThere([ 'database', 'json', 'client.js' ]) ? require('../database/json/client') : [],
        element : 'public',
        prefix : 'json-admin',
        title : 'client',
    }),
};


