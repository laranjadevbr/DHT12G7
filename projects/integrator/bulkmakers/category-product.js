const {
    lorem : {
        title,
        description,
    },
} = option = require('../database/options');

const bulkMaker = [];

for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        title : title,
        description : description,
    });
};

module.exports = bulkMaker;