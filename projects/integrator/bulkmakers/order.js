const {
    getRandomNumber,
} = require('../utils');

const bulkMaker = [];

for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        fk_public : getRandomNumber(1, 10),
    });
};

module.exports = bulkMaker;