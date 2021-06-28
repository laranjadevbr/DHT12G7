const active = true, label = true, placeholder = false, required = false;
module.exports = (disabled) => {
    return [
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : ['accesskey', 'access key'],
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'email',
            value       : '',
        },
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : 'password',
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'password',
            value       : '',
        },
    ];
};