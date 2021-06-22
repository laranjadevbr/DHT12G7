const fs = require('fs');
const path = require('path');
const urlJoin = require('url-join');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const getRandomInt = getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

const isThere = (filePath) => {
    return fs.existsSync(urlJoin(filePath)) ? true : false;
};

const validate = getValidate = (variable) => {
    if (!variable) return false;
    else if (isThis(variable, 'undefined')) return false;
    else if (!variable && isThis(variable, 'boolean')) return false;
    else if (!variable && isThis(variable, 'number')) return false;
    else if (!variable && isThis(variable, 'string')) return false;
    else return true;
};

const isLast = isTheLast = (string, character) => {
    return string.substr(string['length'] - 1, string['length']) === character ? true : false;
};

const currency = getCurrency = (string) => {
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

const script = getScript = (fileName) => {
    return isThere([
        'public',
        'javascripts',
        fileName + '.js',
    ]) ? '<script type=\"module\" src=\"/javascripts/' + fileName + '.js\"></script>' : '';
};

const getOnlyNumber = (string) => {
    return string.replace(/^[0-9]/g, '').trim();
};

const pageTitle = getPageTitle = (object) => {
    let strign = '';
    strign += object['prefix'] ? object['prefix'] : '';
    strign += object['suffix'] ? object['suffix'] : '';
    return strign.split('/').join(' ').split('-').join(' ').trim();
};

const saver = (variable, jsonVariable, jsonFolder, jsonArchive) => {
    let filePath = path.join('.', jsonFolder, jsonArchive);
    fs.writeFileSync(filePath, 'const ' + jsonVariable + ' = ');
    fs.appendFileSync(filePath, JSON.stringify(variable));
    fs.appendFileSync(filePath, ';');
    fs.appendFileSync(filePath, 'module.exports = ' + jsonVariable + ';');
};


const JSONModify = JSONCreator = (object) => {
     fs.writeFileSync(path.join('.', object['path']), 'const ' + object['name'] + ' = ');
    fs.appendFileSync(path.join('.', object['path']), JSON.stringify(object['content']));
    fs.appendFileSync(path.join('.', object['path']), ';');
    fs.appendFileSync(path.join('.', object['path']), 'module.exports = ' + object['name'] + ';');
};




const roman = getRomanNumber = (number) => {
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

const viewName = getViewName = (object) => {
    let prefix = object['prefix'] ? object['prefix'].split('/').join('-').substr(1, object['prefix']['length'] - 2) : '';
    let suffix = object['suffix'] ? object['suffix'] : '';
    return prefix += suffix ? '-' + suffix : '';
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
    return start > end ? new Date(getRandomNumber(end, start)): new Date(getRandomNumber(start, end));
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
const getPart = (string, endPoint) => {
    const result = [];
    string = (string).split(endPoint);
    for (let i = 0; i < string['length']; i++)
        result.push(string[i]);
    return result;
};
const getHash = (password) => {
    return bcrypt.hashSync(String(password), bcrypt.genSaltSync(10));
};
const isEqual = (object) => {
    return bcrypt.compareSync(object['client'], object['dataBase']) ? true : false;
};
const navbar = getNavbar = JSONPagination = (object) => {
    const listPage = [];
    for (let i = object['query'] * object['number']; i < object['query'] * object['number'] + object['number']; i++)
        listPage.push(object['array'][i]);
    const fullPage = Math.round(object['array']['length'] - 1) / object['number'] - 1;
    return {
        fullPage : fullPage,
        listPage : listPage,
        nextPage : object['query'] < fullPage ? object['query'] + 1 : fullPage,
        prevPage : object['query'] <= 1 ? 1 : object['query'] - 1,
    };
};
const getModelPagination = (object) => {
    const fullPage = Math.round(object['count'] / object['amount']);
    return {
        fullPage : fullPage <= 1 ? undefined : fullPage,
        nextPage : Number(object['page']) < fullPage ? Number(object['page']) + 1 : fullPage,
        prevPage : Number(object['page']) <= 1 ? 1 : Number(object['page']) - 1,
    };
};
const getFormHeader = (object) => {
    return {
        form : {
            action : getURLPath({
                prefix : object['prefix'],
                suffix : object['suffix'],
            }),
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
                required : false,
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
        ...object['param'] && object['column'] ? {
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
        for (let i = 0; i < object['array']['length']; i++) {
            result.push({
                [object['array'][i]] : {
                    [Op.like] : `%${ object['key'] }%`,
                },
            });
        };
    }
    return {
        where : {
            [Op.or] : [
                ...result,
            ],
        },
    };
};
const capitalize = (string) => {
    let result = '', array = string.split(' ');
    for (let i = 0; i < array['length']; i++) {
        if (array[i] == 'cep' || array[i] == 'cnpj' || array[i] == 'cpf' || array[i] == 'rg' || array[i] == 'uf') {
            result += array[i].toUpperCase();
        } else if (array[i] == 'à' || array[i] == 'e' || array[i] == 'da' || array[i] == 'de' || array[i] == 'do' || array[i] == 'em') {
            result += array[i].toLowerCase();
        } else if (array[i] == 'AC' || array[i] == 'AL' || array[i] == 'AP' || array[i] == 'AM' || array[i] == 'BA' || array[i] == 'CE' || array[i] == 'DF' || array[i] == 'ES' || array[i] == 'GO' || array[i] == 'MA' || array[i] == 'MT' || array[i] == 'MS' || array[i] == 'MG' || array[i] == 'PA' || array[i] == 'PB' || array[i] == 'PR' || array[i] == 'PE' || array[i] == 'PI' || array[i] == 'RJ' || array[i] == 'RN' || array[i] == 'RS' || array[i] == 'RO' || array[i] == 'RR' || array[i] == 'SC' || array[i] == 'SP' || array[i] == 'SE' || array[i] == 'TO') {
            result += array[i].toUpperCase();
        } else {
            result += array[i].substr(0, 1).toUpperCase();
            result += array[i].substr(1, array[i]['length']).toLowerCase();
        }
        result += i < array['length'] - 1 ? ' ' : '';
    }
    return result;
};

const cleaner = (result) => {
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

const onlyNumbers = (string) => {
    return string.replace(/^[0-9]/g, '');
};

const plural = getPlural = (string) => {
    if (isTheLast(string, 'y')) string = string.substr(0, string['length'] - 1) + 'ies';
    else if (isTheLast(string, 's')) string += 'es';
    else string += 's';
    return string.trim().toLowerCase();
};

const urlPath = getURLPath = (object) => {
    let strign = '';
    strign += object['prefix'] ? object['prefix'] : '';
    strign += object['suffix'] ? object['suffix'] : '';
    return strign.trim().toLowerCase();
};

const session = (req, res, next) => {
    return req.session.user;
};

const forEveryone = () => {
    return {
        capitalize,
        cleaner,
        roman,
        session,
        validate,
        //
        currency, 
        getCurrency,
        getRomanNumber,
    };
};

module.exports = {
    forEveryone,
    //
    capitalize,
    cleaner,
    // 
    getCNPJNumber,
    getCPFNumber,
    getCurrency,
    getDOCNumber,
    getHash,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getNavbar,
    getOnlyNumber,
    getPageTitle,
    getPart,
    getPhoneNumber,
    getPlural,
    getRandomDate,
    getRandomInt,
    getRandomNumber,
    getRomanNumber,
    getScript,
    getURLPath,
    getValidate,
    getViewName,

    getFormHeader,
    // 
    isEqual,
    isLast,
    isTheLast,
    isThere,
    isThis,
    //
    JSONModify,
    JSONCreator,
    JSONPagination,
    // 
    navbar,
    onlyNumbers,
    pageTitle,
    plural,
    roman,
    saver,
    script,
    session,
    urlPath,
    validate,
    viewName,
};