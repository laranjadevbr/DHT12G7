const fs = require('fs');
const path = require('path');
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};
const isThis = (index, type) => {
    return typeof index === type ? true : false;
};
const isThere = (folder, file, type) => {
    return fs.existsSync(path.join(folder, file + '.' + type)) ? true : false;
};
const currency = (result) => {
    return (result).toLocaleString('pt-br', {
        style : 'currency',
        currency : 'USD',
    });
};
const validate = (variable) => {
    if (variable === null) return false;
    else if (isThis(variable, 'undefined')) return false;
    else if (isThis(variable, 'boolean') && Boolean(variable) === false) return false;
    else if (isThis(variable, 'number') && Number(variable) <= 0) return false;
    else if (isThis(variable, 'string') && String(variable)['length'] <= 0) return false;
    else return true;
};
module.exports = {
    isThere,
    script : (fileName) => {
        let exist = fs.existsSync(path.join('public', 'javascripts', fileName + '.js')) ? true : false;
        return exist ? '<script type=\"module\" src=\"/javascripts/' + fileName + '.js\"></script>' : '';
    },
    getUnified : (array, params) => {
        const result = [];
        for (let i = 0; i < params['length']; i++)
            validate(array[params[i]]) ? result.push(...array[params[i]]) : undefined;
        return result;
    },
    isThis,
    isLast : (index, character) => {
        return index.substr(index['length'] - 1, index['length']) === character ? true : false;
    },
    currency,
    getSalaryRange : (value, range) => {
        const result = [];
        for (let i = 0; i < range; i++) {
            let minimum = value * (i + 1);
            let maximum = value * (i + 2) - 0.01;
            result.push({
                id : i + 1,
                minimum : minimum,
                maximum : maximum,
                option : 'from ' + currency(minimum) + ' to ' + currency(maximum),
                state : true,
            });
        };
        return result;
    },
    capitalize : (string) => {
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
    },
    cleaner : (result) => {
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
    },
    dismember : (string, separator) => {
        const result = [];
        string = (string).split(separator);
        for (let i = 0; i < string['length']; i++)
            result.push(string[i]);
        return result;
    },
    navbar : (query, number, array) => {
        let list = [];
        for (let i = Number(query * number); i <= Number(query * number + number - 1); i++) list.push(array[i]);
        let full = Math.round(Number(array['length'] - 1) / number) - 1;
        let next = Number(query) < Number(full) ? Number(query) + 1 : Number(full);
        let prev = Number(query) <= 1 ? 1 : Number(query) - 1;
        return {
            full,
            list,
            next,
            prev,
        };
    },
    onlyNumbers : (string) => {
        return string.replace(/^[0-9]/g, '');
    },
    pageTitle : (prefix, suffix) => {
        let variable = isThis(suffix, 'undefined') ? prefix : prefix + suffix;
        return variable.split('/').join(' ').split('-').join(' ').substr(1, variable['length'] - 1).trim().toLowerCase();
    },
    plural : (string) => {
        if (string.substr(string['length'] - 1, string['length']) === 'y') string = string.substr(0, string['length'] - 1) + 'ies';
        else if (string.substr(string['length'] - 1, string['length']) === 's') string = string.substr(0, string['length']) + 'es';
        else string += 's';
        return string.trim().toLowerCase();
    },
    readjust : (o, n) => {
        oldprice = o;
        reajuste = - 1 * 100 + n * 100 / o;
        newprice = o += o / 100 * reajuste;
        return { oldprice, reajuste, newprice };
    },
    roman : (number) => {
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
    },
    saver : (variable, jsonVariable, jsonFolder, jsonArchive) => {
        let filePath = path.join('.', jsonFolder, jsonArchive);
        fs.writeFileSync(filePath, 'const ' + jsonVariable + ' = ');
        fs.appendFileSync(filePath, JSON.stringify(variable));
        fs.appendFileSync(filePath, ';');
        fs.appendFileSync(filePath, 'module.exports = ' + jsonVariable + ';');
    },
    urlPath : (prefix, suffix) => {
        return String(isThis(suffix, 'undefined') ? prefix : prefix + suffix).trim().toLowerCase();
    },
    validate,
    viewName : (prefix, suffix) => {
        let variable = isThis(suffix, 'undefined') ? prefix : prefix + suffix;
        return variable.split('/').join('-').substr(1, Number(variable['length'] + (isThis(suffix, 'undefined') ? - 2 : 0))).trim().toLowerCase();
    },
    getNumber : (array) => {
        let num = '', result = '';
        for (let x = 0; x < array['length']; x++) {    
            for (let y = 0; y < array[x]; y++) num += '9';
            result += ('' + Math.floor(Math.random() * Number(num))).padStart(Number(num['length']), '0');
            result += x == array['length'] - 2 ? '-' : '';
            result += x <= array['length'] - 3 ? '.' : '';
            num = '';
        }
        return result;
    },
    getCNPJ : (array) => {
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
    },
    getPhone : (array) => {
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
    },
    getCPF : () => {
        let getNumber = (array) => {
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
        let getDigit = (num1, num2, num3, num4) => {
            let num = num1.split('').concat(num2.split(''), num3.split('')), x = 0;    
            if (num4 !== undefined) num[9] = num4;
            for (let i = (num4 ? 11 : 10), j = 0; i >= 2; i--, j++) x += parseInt(num[j]) * i;
            return (y = x % 11) < 2 ? 0 : 11 - (y = x % 11);
        };
        const num1 = getNumber([3]), num2 = getNumber([3]), num3 = getNumber([3]), dig = getDigit(num1, num2, num3);
        return `${ num1 }.${ num2 }.${ num3 }-${ dig }${ getDigit(num1, num2, num3, dig) }`;
    },
    getRandomInt,
    getRandomDate : (start, end) => {
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        return start > end ? new Date(getRandomInt(end, start)).toLocaleDateString() : new Date(getRandomInt(start, end)).toLocaleDateString();
    },
    getModelParams : (model, as) => {
        const include = isThis(model, 'undefined') || isThis(as, 'undefined') ? { } : {
            include : {
                model : model,
                as : as,
                required : false,
            },
        };
        return {
            ...include,
            order : [
                ['id', 'ASC'],
            ],
        };
    },
};