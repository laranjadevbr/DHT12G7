const {
    hobbies,
} = require('../options');
const active = true, label = true, placeholder = false, required = false;
module.exports = (disabled) => {
    return [
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : 'hobbies',
            note        : '',
            option      : hobbies,
            placeholder : placeholder,
            required    : required,
            rows        : 5,
            type        : 'checkbox',
            value       : '',
        },
    ];
};