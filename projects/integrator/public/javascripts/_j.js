import {
    getSelector,
    getID,
    addRemoveClasses,
    validate,
} from './main.js';

addRemoveClasses([
    '#content',
], ['col-12'], 'add');

addRemoveClasses([
    '#error-list',
], ['col-12'], 'add');

addRemoveClasses([
    'label',
], ['form-label', 'mt-3'], 'add');

addRemoveClasses([
    'input',
    'textarea',
], ['form-control'], 'add');

addRemoveClasses([
    'select',
], ['form-select'], 'add');

addRemoveClasses([
    '#error-list',
], ['alert', 'alert-danger'], 'add');

addRemoveClasses([
    '#btn',
], ['btn', 'btn-primary', 'mt-3'], 'add');

addRemoveClasses([
    '#contact-form',
], ['row', 'center-all'], 'add');

let errorMessage = (element) => {
    if (!validate(getID(element)['value'])) {
        errorsList['innerHTML'] += '<li>' + 'The \"' + (element).toUpperCase() + '\" field is empty!' + '</li>';
    } else { errorsList['innerHTML'] = ''; }   
    return errorsList['innerHTML'];
};

let elements = ['name', 'email', 'state', 'contact-form', 'message'];

let wrongElements = ['name', 'email', 'state', 'message'];

getID('error-list')['innerHTML'] += '<p>';
getID('error-list')['innerHTML'] += 'notes:'.toUpperCase();
getID('error-list')['innerHTML'] += '</p>';
getID('error-list')['innerHTML'] += '<ul>';
getID('error-list')['innerHTML'] += '</ul>';

let errorsList = getSelector('#error-list ul');

let validateForm = (elements, textColor, backColor) => {
    for (let i = 0; i <= Number(elements['length'] - 1); i++) {
        let index = getID(elements[i]);
        if (elements[i] === 'contact-form') {
            index.addEventListener('submit', function (event) {
                errorsList['innerHTML'] = '';
                for (let x = 0; x <= Number(wrongElements['length'] - 1); x++) {
                    errorMessage(wrongElements[x]);
                }
                if (!errorsList.querySelectorAll('li')['length']) { } else {
                    getID('error-list').hidden = '';
                    event.preventDefault();
                };
            });
        } else if (elements[i] !== 'contact-form') {
            index.addEventListener('focus', function (event) {
                console.log('NOTE: You are in the \"' + (event.target['id']).toUpperCase() + '\" field!');
                event.target.style['backgroundColor'] = backColor;
                event.target.style['color'] = textColor;
            });
            let currentBackColor = index.style['backgroundColor'];
            let currentTextColor = index.style['color'];
            index.addEventListener('blur', function (event) {
                event.target['value'] === '' ? console.log('NOTE: The \"' + (event.target['id']).toUpperCase() + '\" is not complete!') : console.log(event.target['value']);
                event.target.style['backgroundColor'] = currentBackColor;
                event.target.style['color'] = currentTextColor;
            });
            index.addEventListener('keyup', function (event) {
                console.log(event.target['value']);
            });
            index.addEventListener('change', function (event) {
                console.log(event.target['value']);
            });
        };
    };
};

validateForm(elements, '#FFF', '#F00');