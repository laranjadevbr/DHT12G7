let {
    getControllers,
} = require('../utils/controllers/json/item');
module.exports = {
    ...getControllers({
        database : require('../database/json/recipe'),
        element : 'service',
        prefix : 'json-recipe',
        title : 'recipe',
    }),
};