let {
    getCNPJNumber,
    getCPFNumber,
    getDOCNumber,
    getHash,
    getLoremIpsum,
    getPhoneNumber,
    getPublicList,
    getPublicListRecord,
    getRandomDate,
    getRandomEmail,
    getRandomIndex,
} = require('../utils');
const bulkmaker = (array) => {
    const result = [];
    for (let i = 0; i < array['length']; i++) {
        const email = getRandomEmail(array, i)['email'];
        const password = getHash(getRandomEmail(array, i)['password']);
        const birthDate = getRandomDate(new Date().setFullYear(new Date().getFullYear() - 100), new Date());
        birthDate.toLocaleString("en-US", { timeZone : 'America/Sao_Paulo' });
        birthDate.setHours(0, 0, 0);
        result.push({
            ...getPublicListRecord(array, i),
            description : getLoremIpsum()['description'],
            birthdate : birthDate,
            status : getRandomIndex({ array : 'status' }),
            cpf : getCPFNumber(),
            rg : getDOCNumber([2, 3, 3, 1]),
            cep : getDOCNumber([5, 3]),
            state : getRandomIndex({ array : 'uf' }),
            email : email,
            phone : getPhoneNumber([2, 1, 4, 4]),
            cnpj : getCNPJNumber([2, 3, 3, 4, 2]),
            profession : getRandomIndex({ array : 'profession' }),
            curriculum : getLoremIpsum()['description'],
            salary : getRandomIndex({ array : 'salary' }),
            accesskey : email,
            password : password,
            confirmation : password,
        });
    };
    return result;
}
module.exports = bulkmaker(getPublicList());