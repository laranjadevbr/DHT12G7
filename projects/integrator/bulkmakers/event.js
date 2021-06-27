const {
    getRandomNumber,
} = require('../utils');
const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : require('../database/option')['lorem']['title'],
        description : require('../database/option')['lorem']['description'],
        cost : getRandomNumber(100, 999),
        fk_category : getRandomNumber(1, 9),
    });
};
module.exports = bulkMaker;