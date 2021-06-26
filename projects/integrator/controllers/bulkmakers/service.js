const option = require('../../database/options');
const {
    getRandomNumber,
} = require('../../utils');
const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : option['lorem']['title'],
        description : option['lorem']['description'],
        cost : getRandomNumber(100, 999),
        fk_category : getRandomNumber(1, 9),
    });
};
module.exports = bulkMaker;