let {
    getControllers,
} = require('../utils/controllers/json/item');
let {
    isThere,
} = require('../utils');
module.exports = {
    ...getControllers({
        database : isThere([ 'database', 'json', 'recipe.js' ]) ? require('../database/json/recipe') : [],
        element : 'service',
        prefix : 'json-recipe',
        title : 'recipe',
    }),
};