const {
    Category,
    Event,
} = require('../models');
let {
    everyoneItem,
} = require('../utils/item');
module.exports = {
    ...everyoneItem({
        title : 'category',
        modelName : Category,
        includeAlias : 'event',
        includeName : Event,
        prefix : 'category-event',
    }),
};