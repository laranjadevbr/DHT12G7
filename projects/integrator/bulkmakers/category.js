const {
    getLorem,
} = require('../utils');
const bulkmaker = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            ...getLorem(),
        });
    };
    return result;
}
module.exports = bulkmaker(10);