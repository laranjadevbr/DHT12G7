let {
    getCNPJNumber,
    getCPFNumber,
    getDOCNumber,
    getHash,
    getIndexList,
    getIndexListRecord,
    getLorem,
    getPhoneNumber,
    getRandomDate,
    getRandomEmail,
    getRandomIndex,
} = require('../utils');
const bulkmaker = (array) => {
    const result = [];
    for (let i = 0; i < array['length']; i++) {
        const email = getRandomEmail(array, i)['email'];
        const password = getHash(getRandomEmail(array, i)['password']);
        result.push({
            ...getIndexListRecord(array, i),
            description : getLorem()['description'],
            birthdate : getRandomDate(
                new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate()
                ),
                new Date(
                    new Date().getFullYear() + 100,
                    new Date().getMonth(),
                    new Date().getDate()
                ),
            ),
            status : getRandomIndex({ array : 'status' }),
            cpf : getCPFNumber(),
            rg : getDOCNumber([2, 3, 3, 1]),
            cep : getDOCNumber([5, 3]),
            state : getRandomIndex({ array : 'uf' }),
            email : email,
            phone : getPhoneNumber([2, 1, 4, 4]),
            cnpj : getCNPJNumber([2, 3, 3, 4, 2]),
            profession : getRandomIndex({ array : 'profession' }),
            curriculum : getLorem()['description'],
            salary : getRandomIndex({ array : 'salary' }),
            accesskey : email,
            password : password,
            confirmation : password,
        });
    };
    return result;
}
module.exports = bulkmaker(getIndexList());