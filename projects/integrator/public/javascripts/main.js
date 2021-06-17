export let getTag = (element) => { return window.document.getElementsByTagName(element); };

export let getSelector = (element) => { return window.document.querySelector(element); };

export let getSelectors = (element) => { return window.document.querySelectorAll(element); };

export let getName = (element) => { return window.document.getElementsByName(element); };

export let getClass = (element) => { return window.document.getElementsByClassName(element); };

export let getID = (element) => { return window.document.getElementById(element); };

export let createElement = (element) => { return window.document.createElement(element); };

export let addRemoveClasses = (elements, classes, method) => {
    for (let x = 0; x < elements['length']; x++) {
        for (let y = 0; y < getSelectors(elements[x])['length']; y++) {
            for (let z = 0; z < classes['length']; z++) {
                getSelectors(elements[x])[y]['classList'][method](classes[z]);
            };
        };
    };
};

export let containerEvents = (elements) => {
    window.addEventListener('load', function (event) {
        for (let x = 0; x < elements['length']; x++) {
            for (let y = 0; y < getSelectors(elements[x])['length']; y++) {
                getSelectors(elements[x])[y].addEventListener('mouseover', function (event) {
                    event.preventDefault();
                    this['classList'].remove('shrink');
                    this['classList'].add('grow');
                });
                getSelectors(elements[x])[y].addEventListener('mouseout', function (event) {
                    this['classList'].remove('grow');
                    this['classList'].add('shrink');
                });
            };
        };
    });
};

export let containerStyle = (elements, styles) => {
    for (let x = 0; x < elements['length']; x++) {
        for (let y = 0; y < getSelectors(elements[x])['length']; y++) {
            for (let z = 0; z < styles['length']; z++) {
                getSelectors(elements[x])[y]['style'][styles[z][0]] = styles[z][1];
            };
        };
    };
};

export let toHexadecimal = (r, g, b) => {
    let fromRGB = (c) => {
        return c.toString(16)['length'] <= 1 ? '0' + c.toString(16) : c.toString(16);
    }
    return '#' + fromRGB(r) + fromRGB(g) + fromRGB(b);
};

export let colorPalette = (number) => {
    let array = [];
    number = number > 255 ? 255 : number;
    for (let r = 0; r < number; r++) {
        for (let g = 0; g < number; g++) {
            for (let b = 0; b < number; b++) {
                array.push(toHexadecimal(r, g, b));
            };
        };
    };
    return array;
};

export let colorGenerator = (colors, opacity = 1) => {
    let toFragment = (colors, opacity = 1) => {
        let color = '#';
        color += String(colors)['length'] <= 3 ? colors.substr(0, 1) + colors.substr(0, 1) + colors.substr(1, 1) + colors.substr(1, 1) + colors.substr(2, 2) + colors.substr(2, 2) : colors;
        color += opacity < 10 ? String('0' + opacity) : String(opacity);
        return color;
    };
    if (typeof colors === 'undefined') { return `rgba(${ parseInt(Math.random() * 255) }, ${ parseInt(Math.random() * 255) }, ${ parseInt(Math.random() * 255) }, ${ opacity })`;
    } else if (typeof colors === 'string') { return toFragment(colors, opacity);
    } else if (typeof colors === 'object') { let array = [];
        for (let i = 0; i < colors['length']; i++)
            array.push(toFragment(colors[i], opacity));
        return array[Math.floor(Math.random() * array['length'])];
    };
};

export let styleFunction = (object, array, fatherElement, childElement) => {
    let index = createElement(childElement);
    for (let i = 0; i < array['length']; i++)
        index['style'][array[i][0]] = object[array[i][0]];
    return getSelector(fatherElement).appendChild(index);
};

export class styleObject {
    constructor (object) {
        for (let i = 0; i < object['length']; i++)
            this[object[i][0]] = object[i][1];
    };
};

export let containerPalette = (fatherElement, childElement, numberStart, numberEnd, styleList) => {
    for (let i = numberStart; i <= numberEnd; i++) {
        let index = createElement(childElement);
        index['innerText'] += colorPalette(numberEnd)[i];
        index['style']['backgroundColor'] = colorGenerator();
        for (let x = 0; x < styleList['length']; x++)
            index['style'][styleList[x][0]] = new styleObject(styleList)[styleList[x][0]];
        getID(fatherElement).appendChild(index);
    };
};

export let validate = (variable) => {
    if (!variable)
        return false;
    else if (typeof variable === 'undefined')
        return false;
    else if (typeof variable === 'boolean')
        return false;
    else if (typeof variable === 'number')
        return false;
    else if (typeof variable === 'string')
        return false;
    else
        return true;
};

let day = [
    ['domingo', 'sunday'],
    ['segunda-feira', 'monday'],
    ['terça-feira', 'tuesday'],
    ['quarta-feira', 'wednesday'],
    ['quinta-feira', 'thursday'],
    ['sexta-feira', 'friday'],
    ['sábado', 'saturday'],
];

let month = [
    ['janeiro', 'january'],
    ['fevereiro', 'february'],
    ['março', 'march'],
    ['abril', 'april'],
    ['maio', 'may'],
    ['junho', 'june'],
    ['julho', 'July'],
    ['agosto', 'august'],
    ['outubro', 'october'],
    ['novembro', 'november'],
    ['dezembro', 'december'],
];

export let timer = (element, seconds) => {
    setInterval(function (event) {
        let result = '';
        result += day[new Date().getDay()][1];
        result += ' | ';
        result += month[new Date().getMonth()][1];
        result += ' ';
        result += new Date().getDate().toString().padStart(2, '0');
        result += ', ';
        result += new Date().getFullYear();
        result += ' | ';
        result += new Date().getHours().toString().padStart(2, '0');
        result += ':';
        result += new Date().getMinutes().toString().padStart(2, '0');
        result += ':';
        result += new Date().getSeconds().toString().padStart(2, '0');
        result += '.';
        return getID(element).innerHTML = result;
    }, Number(seconds * 1000));
};

export let cleaner = (string) => {
    let array = [
        ['&nbsp;', ' '],
        [' ', '-'],
        [',', ''],
        ['_', ''],
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
        string = string.split(array[i][0]).join(array[i][1]).toLowerCase();
    return string;
};

export let byLine = (element, name, email, phone) => {
    let html = name;
    html += ' | ' + '<a href=\"mailto:' + email + '\" target=\"_blank\">' + email + '</a>';
    html += ' | ' + '<a href=\"https://api.whatsapp.com/send?phone=/' + cleaner(phone) + '\" target=\"_blank\">' + phone + '</a>';
    return getID(element).innerHTML = html;
};

export let mask = (element) => {
    if (!validate(getID(element))) { } else {
        getID(element).addEventListener('input', (element) => {
            let x = element.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
            element.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
        });
    };
};

export let elementEvent = (elements, background, color) => {
    for (let x = 0; x < elements['length']; x++) {
        for (let y = 0; y < getSelectors(elements[x])['length']; y++) {
            getSelectors(elements[x])[y].addEventListener('focus', function (event) {
                this['style']['backgroundColor'] = color;
                this['style']['color'] = background;
            });
            getSelectors(elements[x])[y].addEventListener('blur', function (event) {
                this['style']['backgroundColor'] = background;
                this['style']['color'] = color;
            });
        };
    };
};

export let validator = (validated, errorElement, errorMessage) => {
    getSelector('form').addEventListener('submit', function (event) {
        let errorNumber = 0;
        for (let i = 0; i < getSelectors(validated)['length']; i++) {
            getSelectors(errorElement)[i]['textContent'] = !getSelectors(validated)[i]['value'].trim() ? errorMessage : '';
            errorNumber += !getSelectors(validated)[i]['value'].trim() ? 1 : 0;
        };
        errorNumber ? event.preventDefault() : undefined;
    });
};