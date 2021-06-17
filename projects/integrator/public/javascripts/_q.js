class Object {
    constructor (object) {
        for (let i = 0; i <= Number(object['length'] - 1); i++) {
            this[object[i][0]] = object[i][1];
        };
    };
};

const object = new Object([
    ['color', '#FFF'],
    ['display', 'inline-block'],
    ['float', 'left'],
    ['padding', '1rem'],
    ['textAlign', 'center'],
]);

console.log(object);