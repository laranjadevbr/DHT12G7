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
        const startDate = getRandomDate(
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
                ),
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(new Date().setMonth(getRandomNumber(new Date().getMonth(), 10))),
                new Date().getDate()
                ),
        );
        startDate.toLocaleString("en-US", { timeZone : 'America/Sao_Paulo' });
        startDate.setHours(0, 0, 0);
        const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(startDate.setDate(getRandomNumber(startDate.getDate(), 31)))
            );
        endDate.toLocaleString("en-US", { timeZone : 'America/Sao_Paulo' });
        endDate.setHours(0, 0, 0);
        let getHour = getRandomNumber(1, 23);
        const startTime = new Date(
            new Date().setHours(getHour, getRandomNumber(1, 60), getRandomNumber(1, 60))
            );
        const endTime = new Date(
            new Date().setHours(getRandomNumber(getHour, 23), getRandomNumber(1, 60), getRandomNumber(1, 60))
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