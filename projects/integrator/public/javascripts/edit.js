// import {
//     elementEvent,
//     getSelectors,
//     validator,
// } from './main.js';

// elementEvent([
//     'input',
//     'select',
//     'textarea',
// ], '#fff', '#000');

// for (let i = 0; i < getSelectors('#error p')['length']; i++)
//     getSelectors('#error p')[i]['style']['color'] = '#f00';

// validator('.form-control', '#error p', 'Invalid Field!');

// document.querySelector('#cep').addEventListener('blur', () => {
//     fetch(`https://cep.awesomeapi.com.br/${ cep['value'].replace('-', '') }`, {
//         method : 'GET',
//         mode : 'cors',
//         cache : 'default',
//     }).then((result) => {
//         return result.json().then((result) => {
//             for (const index in result)
//                 if (document.querySelector('#' + index))
//                     document.querySelector('#' + index)['value'] = result[index];
//         }).catch((result) => {
//             console.log(result);
//         });
//     }).catch((result) => {
//         console.log(result);
//     });
// });