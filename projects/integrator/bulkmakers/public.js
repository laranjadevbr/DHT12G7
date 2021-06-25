const option = require('../database/options');
const first = option['name']['first'];
const last = option['name']['last'];
const generous = option['generous'];
const description = option['lorem']['description'];
let {
    getCNPJNumber,
    getCPFNumber,
    getDOCNumber,
    getHash,
    getPhoneNumber,
    getRandomDate,
    getRandomNumber,
} = require('../utils');
let getRandomIndex = (object) => {
    const result = [];
    for (let i = 0; i < object['require'][object['array']]['length']; i++)
        object['require'][object['array']][i]['option'] !== '' ?
        result.push(object['require'][object['array']][i]['option']) :
        undefined;
    return result[Math.floor(Math.random() * result['length'])];
};
const name = [];
let pushIndex = (index) => {
    const result = [];
    for (let i = 0; i < first[index]['length']; i++) {
        result.push({
            first : first[index][i].toLowerCase(),
            last : last[Math.floor(Math.random() * last['length'])].toLowerCase(),
            gender : index.toLowerCase(),
        });
    };
    return result;
};
for (let i = 0; i < generous['length']; i++)
    generous[i]['option'] !== '' ? name.push(...pushIndex(generous[i]['option'])) : undefined;
const bulkMaker = [];
for (let i = 0; i < name['length']; i++) {
    let email = name[i]['first'].substr(0, 1);
    email += name[i]['last'].substr(0, 1);
    let password = getRandomNumber(100000, 999999);
    email += password;
    email += '@';
    email += getRandomIndex({
        require : option,
        array : 'emails',
    });
    email += '.com';
    password = getHash(password);
    bulkMaker.push({
        title : name[i]['first'] + ' ' + name[i]['last'],
        description : description,
        gender : name[i]['gender'],
        birthdate : getRandomDate(
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate()),
        ),
        status : getRandomIndex({
            require : option,
            array : 'status',
        }),
        cpf : getCPFNumber(),
        rg : getDOCNumber([2, 3, 3, 1]),
        cep : getDOCNumber([5, 3]),
        state : getRandomIndex({
            require : option,
            array : 'uf',
        }),
        email : String(email).toLowerCase(),
        phone : getPhoneNumber([2, 1, 4, 4]),
        cnpj : getCNPJNumber([2, 3, 3, 4, 2]),
        profession : getRandomIndex({
            require : option,
            array : 'profession',
        }),
        curriculum : description,
        salary : getRandomIndex({
            require : option,
            array : 'salary',
        }),
        accesskey : String(email).toLowerCase(),
        password : password,
        confirmation : password,
    });
};
module.exports = bulkMaker;