const active = true, label = true, placeholder = false, required = false;
module.exports = (disabled) => {
    const name = [
        'approved',
        'deleted',
        'disable',
    ];
    const array = [];
    for (let i = 0; i < name['length']; i++) {
        array.push(
            {
                active : active,
                disabled : disabled,
                label : label,
                maxlength : '',
                name : name[i],
                note : '',
                option : [
                    ['', false],
                    ['true', true],
                    ['false', true],
                ],
                placeholder : placeholder,
                required : required,
                rows : 0,
                type : 'select',
                value : '',
            },
        );
    }
    return array;
};