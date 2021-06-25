const option = require('../database/options');
const title = option['lorem']['title'];
const description = option['lorem']['description'];
const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : title,
        description : description,
    });
};
module.exports = bulkMaker;