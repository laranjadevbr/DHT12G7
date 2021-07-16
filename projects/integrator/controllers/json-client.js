let {
    getControllers,
} = require('../utils/controllers/json/public');
module.exports = {
    ...getControllers({
        element : 'public',
        prefix : 'json-client',
        require : [
            'database',
            'texts',
        ],
        title : 'client',
    }),
};