import {
    getSelector,
    getSelectors,
    getClass,
    containerEvents,
    containerStyle,
    addRemoveClasses,
    colorGenerator,
    containerPalette,
} from './main.js';

containerPalette('colorPalette', 'p', 0, 10, [
    ['color', '#FFF'],
    ['display', 'inline-block'],
    ['float', 'left'],
    ['padding', '1rem'],
    ['textAlign', 'center'],
    ['width', 100 / 10 + '%'],
]);

for (let x = 1; x <= 6; x++) {
    for (let y = 0; y <= Number(getSelectors('h' + x)['length'] - 1); y++) {
        getSelectors('h' + x)[y]['innerText'] = 'Lorem ipsum.';
    };
};

addRemoveClasses(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], ['bold', 'italic'], 'add');

addRemoveClasses(['h2'], ['bold'], 'remove');

containerEvents(['.paragraph']);

for (let i = 0; i <= Number(getClass('paragraph')['length'] - 1); i++) {
    containerStyle(['.paragraph'], [
        ['backgroundColor', colorGenerator()],
        ['color', '#FFF'],
        ['float', 'left'],
        ['padding', '10px'],
        ['width', (100 / i + '%')],
    ]);
};

for (let i = 1; i <= 6; i++) {
    containerStyle(['h' + i], [
        ['backgroundColor', colorGenerator()],
        ['color', '#FFF'],
    ]);
};

setTimeout(function (event) {
    for (let i = 1; i <= 6; i++) {
        containerStyle(['h' + i], [
            ['backgroundColor', colorGenerator()],
            ['color', '#FFF'],
        ]);
    };
}, 1000 * 1);

let index = getSelector('h1')['innerText'];

let watch = setInterval(function (event) {
    let date = new Date();
    getSelector('h1')['innerText'] = date.toLocaleString();
}, 1000 * 1);

setTimeout(function (event) {
    clearInterval(watch);
    getSelector('h1')['innerText'] = index;
}, 1000 * 5);

window.addEventListener('keypress', function (event) {
    event.key === 'Enter' ? alert(event.key) : undefined;
    console.log(event.key);
});