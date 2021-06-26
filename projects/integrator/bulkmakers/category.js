const option = require('../database/options');
const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : option['lorem']['title'],
        description : option['lorem']['description'],
    });
};
module.exports = bulkMaker;