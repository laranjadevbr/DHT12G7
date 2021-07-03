const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const urlJoin = require('url-join');

const getPathPrefix = (strign) => {
    return {
        pathPrefix : strign ? strign.split('-').join('/').trim().toLowerCase() : '',
    }
};

const getPageTitle = (object) => {
    let result = '';
    result += object['prefix'] ? object['prefix'].trim().split('-').join(' ') : '';
    result += object['suffix'] ? ' ' + object['suffix'].trim() : '';
    return {
        pageTitle : result.toLowerCase(), 
    }
};

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

const getMenuSetup = (string) => {
    return {
        setup : {
            delete : true,
            edit : true,
            in : string.substr(0, 'category'['length']) === 'category' ? true : false,
            on : true,
        },
    };
};

const getValidation = (variable) => {
    if (!variable) return false;
    else if (isThis(variable, 'undefined')) return false;
    else return true;
};

const isTheLast = (string, character) => {
    return string.substr(string['length'] - 1, string['length']) === character ? true : false;
};

const getCurrency = (string) => {
    return (string).toLocaleString('pt-br', {
        style : 'currency',
        currency : 'USD',
    });
};

const isThis = (string, type) => {
    return typeof string === type ? true : false;
};

const getDOCNumber = (array) => {
    let num = '', result = '';
    for (let x = 0; x < array['length']; x++) {    
        for (let y = 0; y < array[x]; y++) num += '9';
        result += ('' + Math.floor(Math.random() * Number(num))).padStart(Number(num['length']), '0');
        result += x == array['length'] - 2 ? '-' : '';
        result += x <= array['length'] - 3 ? '.' : '';
        num = '';
    }
    return result;
};

const getScriptModule = (string) => {
    return {
        script : isThere([
            'public',
            'javascripts',
            string + '.js'
        ]) ? '<script type=\"module\" src=\"/javascripts/' + string + '.js\"></script>' : '',
    }
};

const getPublicList = () => {
    const option = require('../database/option');
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
    const result = [];
    for (let i = 0; i < option['generous']['length']; i++)
        option['generous'][i]['option'] !== '' ? result.push(...pushIndex(option['generous'][i]['option'])) : undefined;
    return result;
}

const getForeignKey = (table) => {
    return {
        ...table !== 'category' ? { fk_category : getRandomNumber(1, 9), } : { },
        fk_public : getRandomNumber(1, getPublicList()['length']),
    };
};

const getPublicListRecord = (array, index) => {
    let title = '';
    title += array[index]['first'] + ' ';
    title += array[index]['last'];
    return {
        title : title,
        gender : array[index]['gender'],
    }
};

const getRandomEmail = (array, index) => {
    let email = array[index]['first'].substr(0, 1);
    email += array[index]['last'].substr(0, 1);
    let password = getRandomNumber(100000, 999999);
    email += password;
    email += '@';
    email += getRandomIndex({ array : 'emails' });
    email += '.com';
    return {
        email : email,
        password : password,
    };
};

const isThere = (array) => {
    return fs.existsSync(urlJoin(array)) ? true : false;
};

const JSONModify = (object) => {
    const URLpath = [
        'database',
        'json',
        object['name'] + '.js'
    ];
     fs.writeFileSync(urlJoin(URLpath), 'const ' + object['name'] + ' = ');
    fs.appendFileSync(urlJoin(URLpath), JSON.stringify(object['content']));
    fs.appendFileSync(urlJoin(URLpath), ';');
    fs.appendFileSync(urlJoin(URLpath), 'module.exports = ' + object['name'] + ';');
};

const getLoremIpsum = () => {
    return {
        title : isThere([
            'database',
            'option.js',
        ]) ? require('../database/option')['lorem']['title'] : '',
        description : isThere([
            'database',
            'option.js',
        ]) ? require('../database/option')['lorem']['description'] : '',
    };
};

let getRandomIndex = (object) => {
    const result = [];
    const option = require('../database/option');
    for (let i = 0; i < option[object['array']]['length']; i++)
        option[object['array']][i]['option'] !== '' ? result.push(option[object['array']][i]['option']) : undefined;
    return result[Math.floor(Math.random() * result['length'])];
};

const getRomanNumber = (number) => {
    let r = '';
    let division = 0;
    let rest = number;
    let arabic = [1000, 500, 100, 50, 10];
    let romans = ['M', 'D', 'C', 'L', 'X'];
    let dozen = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    for (let i = 0; i < arabic['length']; i++) {
        division = parseInt(rest / arabic[i]);
        rest = number % arabic[i];
        if (division > 0) {
            for (let x = 0; x < division; x++) {
                r = r + romans[i];
            }
        }
        if (rest < 10) {
            r = r + dozen[rest - 1];
            break;
        }
    }
    return r;
};

const getCNPJNumber = (array) => {
    let num = '', result = '';
    for (let x = 0; x < array['length']; x++) {    
        for (let y = 0; y < array[x]; y++) num += '9';
        result += x == 3 ? '0001' : ('' + Math.floor(Math.random() * Number(num))).padStart(Number(num['length']), '0');
        result += x == array['length'] - 2 ? '-' : '';
        result += x == array['length'] - 3 ? '/' : '';
        result += x <= array['length'] - 4 ? '.' : '';
        num = '';
    }
    return result;
};

const getCPFNumber = () => {
    let getDOCDigit = (num1, num2, num3, num4) => {
        let num = num1.split('').concat(num2.split(''), num3.split('')), x = 0;    
        if (num4 !== undefined) num[9] = num4;
        for (let i = (num4 ? 11 : 10), j = 0; i >= 2; i--, j++) x += parseInt(num[j]) * i;
        return (y = x % 11) < 2 ? 0 : 11 - (y = x % 11);
    };
    const num1 = getDOCNumber([3]), num2 = getDOCNumber([3]), num3 = getDOCNumber([3]), dig = getDOCDigit(num1, num2, num3);
    return `${ num1 }.${ num2 }.${ num3 }-${ dig }${ getDOCDigit(num1, num2, num3, dig) }`;
};

const getRandomDate = (start, end) => {
    start = new Date(start).getTime();
    end = new Date(end).getTime();
    return start > end ? new Date(getRandomNumber(end, start)) : new Date(getRandomNumber(start, end));
};

const getPhoneNumber = (array) => {
    let num = '', result = '(';
    for (let x = 0; x < array['length']; x++) {    
        for (let y = 0; y < array[x]; y++) num += '9';
        result += x == 1 ? '9' : ('' + Math.floor(Math.random() * Number(num))).padStart(Number(num['length']), '0');
        result += x == array['length'] - 2 ? '-' : '';
        result += x == array['length'] - 3 ? ' ' : '';
        result += x <= array['length'] - 4 ? ') ' : '';
        num = '';
    }
    return result;
};

const getHash = (password) => {
    return bcrypt.hashSync(String(password), bcrypt.genSaltSync(10));
};

const isEqual = (object) => {
    return bcrypt.compareSync(object['client'], object['dataBase']) ? true : false;
};

const JSONPagination = (object) => {
    const listPage = [];
    let offset = Number(object['offset']), limit = object['limit'], array = object['array'];
    const gap = limit * (offset - 1);
    for (let i = gap; i < (gap + limit <= array['length'] ? gap + limit : array['length']); i++)
        listPage.push(array[i]);
    return {
        fullPage : Math.round(array['length'] / limit),
        listPage : listPage,
        nextPage : offset < Math.round(array['length'] / limit) ? offset + 1 : Math.round(array['length'] / limit),
        prevPage : offset <= 1 ? 1 : offset - 1,
    };
};

const getModelPagination = (object) => {
    const fullPage = Math.round(object['count'] / object['amount']);
    return {
        fullPage : fullPage <= 1 ? undefined : fullPage,
        nextPage : Number(object['offset']) < fullPage ? Number(object['offset']) + 1 : fullPage,
        prevPage : Number(object['offset']) <= 1 ? 1 : Number(object['offset']) - 1,
    };
};

const getFormHeader = (object) => {
    return {
        form : {
            ...object['prefix'] && object['suffix'] ? {
                action : getURLPath({
                    prefix : object['prefix'],
                    suffix : object['suffix'],
                }),
            } : {
            },
            ...object['enctype'] ? {
                enctype : object['enctype'],
            } : {
            },
            ...object['method'] ? {
                method : object['method'],
            } : {
            },
        },
    };
};

const getModelParams = (object) => {
    return {
        ...object['model'] && object['alias'] ? {
            include : {
                model : object['model'],
                as : object['alias'],
                required : true,
            },
        } : {
        },
        ...object['limit'] ? {
            limit : object['limit'],
        } : {
        },
        ...object['offset'] ? {
            offset : object['offset'],
        } : {
        },
        ...object['column'] ? {
            order : [
                [object['column'], 'ASC'],
            ],
        } : {
        },
        ...object['column'] && object['param'] ? {
            where : {
                [object['column']] : object['param'],
            },
        } : {
        },
    };
};

const getModelSearchParams = (object) => {
    const result = [];
    if (!object['array'] || !object['key']) { } else {
        for (let i = 0; i < object['array']['length']; i++)
            result.push({
                [object['array'][i]] : {
                    [Op.like] : `%${ object['key'] }%`,
                },
            });
    }
    return {
        ...result ? {
            where : {
                [Op.or] : [
                    ...result,
                ],
            },
        } : { },
    };
};

const root = [
    '..',
    'database',
]
const getInputType = () => {
    return {
        inputType : require(urlJoin([
            ...root,
            'option'
        ]))['inputType'],
    };
};

const getSearchAction = (object) => {
    return {
        searchAction : getURLPath({
            prefix : object['prefix'],
            suffix : object['suffix'],
        }),
    };
};

const getItem = (string) => {
    return {
        item : require(urlJoin([
            ...root,
            'element',
        ]))['name'][string],
    };
};

const getFormElement = (object) => {
    return {
        formElement : require(urlJoin([
            ...root,
            'element',
        ]))['form'][object['element']][object['type']],
    }
}

const getFirstUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const toClean = (result) => {
    let array = [
        ['&nbsp;', ' '],
        [' ', '-'],
        [',', ''],
        ['_', '_'],
        ['-', ''],
        ['!', ''],
        ['?', ''],
        ['.', ''],
        ['', ''],
        ['(', ''],
        ['(', ''],
        [')', ''],
        [')', ''],
        ['@', ''],
        ['*', ''],
        ['/', ''],
        ['&', ''],
        ['#', ''],
        ['%', ''],
        ['©', ''],
        ['®', ''],
        ['+', ''],
        ['=', ''],
        ['|', ''],
        ['$', ''],
        ['Á', 'a'],
        ['á', 'a'],
        ['À', 'a'],
        ['à', 'a'],
        ['Â', 'a'],
        ['â', 'a'],
        ['Å', 'a'],
        ['å', 'a'],
        ['Ä', 'a'],
        ['ä', 'a'],
        ['Ã', 'a'],
        ['ã', 'a'],
        ['Æ', 'ae'],
        ['æ', 'ae'],
        ['Ç', 'c'],
        ['ç', 'c'],
        ['Ð', 'd'],
        ['ð', 'd'],
        ['É', 'e'],
        ['é', 'e'],
        ['È', 'e'],
        ['è', 'e'],
        ['Ê', 'e'],
        ['ê', 'e'],
        ['Ë', 'e'],
        ['ë', 'e'],
        ['Í', 'i'],
        ['í', 'i'],
        ['Ì', 'i'],
        ['ì', 'i'],
        ['Î', 'i'],
        ['î', 'i'],
        ['Ï', 'i'],
        ['ï', 'i'],
        ['Ñ', 'n'],
        ['ñ', 'n'],
        ['Ó', 'o'],
        ['ó', 'o'],
        ['Ò', 'o'],
        ['ò', 'o'],
        ['ô', 'o'],
        ['Ô', 'o'],
        ['Ö', 'o'],
        ['ö', 'o'],
        ['Õ', 'o'],
        ['õ', 'o'],
        ['Ø', 'o'],
        ['ø', 'o'],
        ['ß', 'b'],
        ['Ú', 'u'],
        ['ú', 'u'],
        ['Ù', 'u'],
        ['ù', 'u'],
        ['Û', 'u'],
        ['û', 'u'],
        ['Ü', 'u'],
        ['ü', 'u'],
        ['Ý', 'y'],
        ['ý', 'y'],
        ['Þ', 'p'],
        ['þ', 'p'],
    ];
    for (let i = 0; i < array['length']; i++)
        result = result.split(array[i][0]).join(array[i][1]);
    return result.trim();
};

const getPlural = (result) => {
    if (isTheLast(result, 'y')) result = result.substr(0, result['length'] - 1) + 'ies';
    else if (isTheLast(result, 's')) result += 'es';
    else result += 's';
    return result.trim().toLowerCase();
};

const getURLPath = (object) => {
    let result = '';
    result += object['prefix'] ? '/' + object['prefix'].split('-').join('/') : '';
    result += object['suffix'] ? '/' + object['suffix'] : '';
    return result.trim().toLowerCase();
};

const session = (req, res, next) => {
    return req.session.user;
};

const arrayUnifier = (array, param) => {
    const result = [];
    for (let i = 0; i < param['length']; i++)
        typeof array[param[i]] !== 'undefined' ? result.push(...array[param[i]]) : undefined;
    return result;
};

const objectCreator = (array) => {
    const result = [];
    result.push({
        id : 0,
        option : '',
    });
    for (let i = 0; i < array['length']; i++)
        result.push({
            id : i + 1,
            option : array[i],
        });
    return result;
};

const getSalaryRange = (gap, end) => {
    const result = [];
    result.push({
        id : 0,
        minimum : '',
        maximum : '',
        option : '',
    });
    for (let i = 1; i < end; i++) {
        let minimum = gap * (i + 0);
        let maximum = gap * (i + 1) - 0.01;
        result.push({
            id : i,
            minimum : minimum,
            maximum : maximum,
            option : 'from ' + getCurrency(minimum) + ' to ' + getCurrency(maximum),
        });
    }
    return result;
};

let getDateFormat = (string) => {
    const day = new Date(string).getDate().toString().padStart(2, '0'),
    month = (new Date(string).getMonth() + 1).toString().padStart(2, '0'),
    year = new Date(string).getFullYear();
    return day + '/' + month + '/' + year;
}

const everyoneView = () => {
    return {
        getCurrency,
        getDateFormat,
        getFirstUpperCase,
        getRomanNumber,
        getValidation,
        isThis,
        session,
        toClean,
    };
};

module.exports = {
    arrayUnifier,
    everyoneView,
    getCNPJNumber,
    getCPFNumber,
    getDOCNumber,
    getFirstUpperCase,
    getForeignKey,
    getFormElement,
    getFormHeader,
    getHash,
    getInputType,
    getItem,
    getLoremIpsum,
    getMenuSetup,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getPageTitle,
    getPathPrefix,
    getPhoneNumber,
    getPlural,
    getPublicList,
    getPublicListRecord,
    getRandomDate,
    getRandomEmail,
    getRandomIndex,
    getRandomNumber,
    getSalaryRange,
    getScriptModule,
    getSearchAction,
    getURLPath,
    isEqual,
    isTheLast,
    isThere,
    isThis,
    JSONModify,
    JSONPagination,
    objectCreator,
};