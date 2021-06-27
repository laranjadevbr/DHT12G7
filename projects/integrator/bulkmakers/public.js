const option = require('../database/option');
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
let pushIndex = (index) => {
    const result = [];
    for (let i = 0; i < option['name']['first'][index]['length']; i++) {
        result.push({
            first : option['name']['first'][index][i].toLowerCase(),
            last : option['name']['last'][Math.floor(Math.random() * option['name']['last']['length'])].toLowerCase(),
            gender : index.toLowerCase(),
        });
    };
    return result;
};
const name = [];
for (let i = 0; i < option['generous']['length']; i++)
    option['generous'][i]['option'] !== ''
    ? name.push(...pushIndex(option['generous'][i]['option']))
    : undefined;
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
        description : option['lorem']['description'],
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
        curriculum : option['lorem']['description'],
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