const {
    getRandomNumber,
} = require('../utils');
const bulkMaker = [];
for (let i = 0; i < 10; i++) {
    bulkMaker.push({
        fk_category : getRandomNumber(1, 9),
        title : require('../database/option')['lorem']['title'],
        description : require('../database/option')['lorem']['description'],
        cost : getRandomNumber(100, 999),
        // startdate: null,
        // enddate: null,
        // starttime: "00:00:00",
        // endtime: "00:00:00",
        // cep: null,
        // address: null,
        // number: null,
        // district: null,
        // city: null,
        // state: null,
        // email: null,
        // phone: null,
    });
};
module.exports = bulkMaker;


