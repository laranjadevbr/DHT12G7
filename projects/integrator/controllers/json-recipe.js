let {
    getControllers,
} = require('../utils/controllers/json/item');
module.exports = {
    ...getControllers({
        element : 'service',
        prefix : 'json-recipe',
        require : [
            'database',
            'texts',
        ],
        title : 'recipe',
    }),
};