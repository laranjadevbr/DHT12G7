const {
    boolean,
} = option = require('../options');
const active = true, label = true, placeholder = false, required = false;
module.exports = (disabled) => {
    const name = [
        'approved',
        'deleted',
        'disable',
    ];
    const result = [];
    for (let i = 0; i < name['length']; i++) {
        result.push(
            {
                active : active,
                disabled : disabled,
                label : label,
                maxlength : '',
                name : name[i],
                note : '',
                option : boolean,
                placeholder : placeholder,
                required : required,
                rows : 0,
                type : 'select',
                value : '',
            },
        );
    }
    return result;
};