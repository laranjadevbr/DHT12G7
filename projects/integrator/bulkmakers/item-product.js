const {
    getForeignKey,
    getLoremIpsum,
    getRandomNumber,
} = require('../utils');
const bulkmaker = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            ...getForeignKey(),
            ...getLoremIpsum(),
            cost : getRandomNumber(100, 999),
        });
    };
    return result;
}
module.exports = bulkmaker(10);