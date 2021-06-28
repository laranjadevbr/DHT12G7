const {
    getDOCNumber,
    getIndexList,
    getLorem,
    getPhoneNumber,
    getRandomDate,
    getRandomEmail,
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
                new Date().getFullYear() + - 100,
                new Date().getMonth(),
                new Date().getDate()
            ),
        );
        const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + getRandomNumber(1, 10)
        );
        // const startTime = ;
        // const endTime = ;
        result.push({
            fk_category : getRandomNumber(1, 9),
            ...getLorem(),
            cost : getRandomNumber(100, 999),
            startdate : startDate,
            enddate : endDate,
            // starttime : startTime,
            // endtime : endTime,
            cep : getDOCNumber([5, 3]),
            number : getRandomNumber(1, 999),
            state : getRandomIndex({ array : 'uf' }),
            email : getRandomEmail(array, i)['email'],
            phone : getPhoneNumber([2, 1, 4, 4]),
        });
    };
    return result;
}
module.exports = bulkmaker(getIndexList());