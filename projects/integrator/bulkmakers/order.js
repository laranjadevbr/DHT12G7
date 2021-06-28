const {
    getRandomNumber,
} = require('../utils');
const bulkmaker = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            fk_public : getRandomNumber(1, 10),
        });
    };
    return result;
}
module.exports = bulkmaker(10);