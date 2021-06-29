const {
    getForeignKey,
    getLoremIpsum,
} = require('../utils');
const bulkmaker = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
        result.push({
            ...getForeignKey('category'),
            ...getLoremIpsum(),
        });
    };
    return result;
}
module.exports = bulkmaker(10);