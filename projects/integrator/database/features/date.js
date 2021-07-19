const active = true, label = true, placeholder = false, required = false;
module.exports = (disabled) => {
    return [
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : ['startdate', 'start date'],
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'date',
            value       : '',
        },
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : ['enddate', 'end date'],
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'date',
            value       : '',
        },
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : ['starttime', 'start time'],
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'time',
            value       : '',
        },
        {
            active      : active,
            disabled    : disabled,
            label       : label,
            maxlength   : '',
            name        : ['endtime', 'end time'],
            note        : '',
            option      : '',
            placeholder : placeholder,
            required    : required,
            rows        : 0,
            type        : 'time',
            value       : '',
        },
    ];
};