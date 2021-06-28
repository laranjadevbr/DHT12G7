const {
    getLorem,
    getRandomNumber,
} = require('../utils');
const bulkmaker = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            ...getLorem(),
            cost : getRandomNumber(100, 999),
            fk_category : getRandomNumber(1, 9),
        });
    };
    return result;
}
module.exports = bulkmaker(10);