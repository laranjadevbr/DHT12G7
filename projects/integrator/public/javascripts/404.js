import {
    addRemoveClasses,
} from './main.js';

addRemoveClasses([
    '#content',
], ['bg-white', 'text-dark'], 'remove');

addRemoveClasses([
    '#content',
], ['bg-danger', 'text-white', 'center-all'], 'add');