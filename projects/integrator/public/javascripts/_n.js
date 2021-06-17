import {
    getID,
    validate,
} from './main.js';

let storage = (storagetype, element) => {
    let message;
    let lang = window.document.documentElement.lang;
    if (lang === 'pt-BR') { message = 'Olá,'; }
    else if (lang === 'en') { message = 'Hello,'; }
    if (!validate(storagetype.getItem(element))) {
        let promptVariable = prompt('Enter your ' + element + '!');
        if (!validate(promptVariable)) { } else {
            getID(element).innerText += message.trim();
            getID(element).innerText += ' ';
            getID(element).innerText += promptVariable.trim();
            getID(element).innerText += '!';
            storagetype.setItem(element, promptVariable);
        }
    } else {
        let storageVariable = storagetype.getItem(element);
        getID(element).innerText += message.trim();
        getID(element).innerText += ' ';
        getID(element).innerText += storageVariable.trim();
        getID(element).innerText += '!';
    }
}

storage(localStorage, 'name');
// localStorage.removeItem('name');
// localStorage.clear();

// storage(sessionStorage, 'name');
// sessionStorage.removeItem('name');
// sessionStorage.clear();