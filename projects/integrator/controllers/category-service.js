const {
    Category,
    Service,
} = require('../models');
let {
    everyoneItem,
} = require('../utils/item');
module.exports = {
    ...everyoneItem({
        title : 'category',
        modelName : Category,
        includeAlias : 'service',
        includeName : Service,
        prefix : 'category-service',
    }),
};