const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : require('../database/option')['lorem']['title'],
        description : require('../database/option')['lorem']['description'],
    });
};
module.exports = bulkMaker;