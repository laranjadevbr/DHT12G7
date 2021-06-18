let capitalize = (string) => {
    let html = '';
    let array = string.split(' ');
    for (let i = 0; i <= Number(array['length'] - 1); i++) {
        html += array[i].substr(0, 1).toUpperCase();
        html += array[i].substr(1, array[i]['length']).toLowerCase();
        html += i < Number(array['length'] - 1) ? ' ' : '';
    }
    return html;
};
let plural = (string) => {
    string = (string).trim().toLowerCase();
    if (String(string).substr(String(string)['length'] - 1, String(string)['length']) === 'y') {
        string = String(string).substr(0, Number(String(string)['length'] - 1)) + 'ies';
    } else if (String(string).substr(String(string)['length'] - 1, String(string)['length']) === 's') {
        string = String(string).substr(0, Number(String(string)['length'])) + 'es';
    } else { string += 's'; }
    return string;
};
module.exports = {
	capitalize,
	plural,
};