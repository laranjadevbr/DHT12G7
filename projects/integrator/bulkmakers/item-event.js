const {
    getDOCNumber,
    getPublicList,
    getForeignKey,
    getLoremIpsum,
    getRandomDate,
    getRandomIndex,
    getRandomNumber,
} = require('../utils');
const bulkmaker = (array) => {
    const result = [];
    for (let i = 0; i < 10; i++) {
        const startDate = new Date();
        startDate.toLocaleString("en-US", { timeZone : 'America/Sao_Paulo' });
        startDate.setMonth(getRandomNumber(new Date().getMonth(), 11));
        startDate.setDate(getRandomNumber(1, 31));
        startDate.setHours(0, 0, 0);
        const endDate = new Date();
        endDate.toLocaleString("en-US", { timeZone : 'America/Sao_Paulo' });
        endDate.setMonth(getRandomNumber(startDate.getMonth(), 11));
        endDate.setDate(getRandomNumber(1, 31));
        endDate.setHours(0, 0, 0);
        const startTime = new Date();
        startTime.setHours(
            getRandomNumber(1, 23),
            getRandomNumber(1, 60), 
            getRandomNumber(1, 60)
        );
        const endTime = new Date();
        endTime.setHours(
            getRandomNumber(startTime.getHours(), 23),
            getRandomNumber(1, 60),
            getRandomNumber(1, 60)
        );
        result.push({
            ...getForeignKey(),
            ...getLoremIpsum(),
            cost : getRandomNumber(100, 999),
            startdate : startDate,
            enddate : endDate,
            starttime : startTime,
            endtime : endTime,
            cep : getDOCNumber([5, 3]),
            number : getRandomNumber(1, 999),
            state : getRandomIndex({ array : 'uf' }),
        });
    };
    return result;
}
module.exports = bulkmaker(getPublicList());