const formBuilder = (array, disabled) => {
    const result = [
        {
            active : true,
            disabled : disabled,
            label : true,
            maxlength : '',
            name : '',
            note : 'deleted',
            option : '',
            placeholder : false,
            required : false,
            rows : 0,
            type : 'start',
            value : '',
        },
    ];
    for (let i = 0; i < array['length']; i++) {
        if (array[i]['title'])
            result.push(
                {
                    active : true,
                    disabled : disabled,
                    label : true,
                    maxlength : '',
                    name : array[i]['title'],
                    note : 'deleted',
                    option : '',
                    placeholder : false,
                    required : false,
                    rows : 0,
                    type : 'h6',
                    value : '',
                },
            );
        result.push(
            ...require('./feature/' + array[i]['object'])(disabled),
            {
                active : true,
                disabled : disabled,
                label : true,
                maxlength : '',
                name : '',
                note : 'deleted',
                option : '',
                placeholder : false,
                required : false,
                rows : 0,
                type : i < result['length'] ? 'end-start' : 'end',
                value : '',
            },
        );
    };
    return result;
};
let nameListBuilder = (index) => {
    const result = [];
    for (let i = 0; i < index['length']; i++)
        index[i]['note'] !== 'deleted' ?
        result.push(index[i]['name']) :
        undefined;
    return result;
}
const public = [
    { title : '', object : 'id' },
    { title : 'profile', object : 'profile' },
    { title : '', object : 'add' },
    { title : '', object : 'picture' },
    // { title : 'hobbies', object : 'hobbies' },
    { title : 'document', object : 'document' },
    { title : 'address', object : 'address' },
    { title : 'contact', object : 'contact' },
    { title : 'curriculum', object : 'curriculum' },
    { title : 'company', object : 'company' },
    { title : 'access', object : 'access' },
    { title : 'state', object : 'state' },
    { title : '', object : 'level' },
    { title : 'create', object : 'create' },
];
const category = [
    { title : '', object : 'id' },
    { title : 'profile', object : 'profile' },
    { title : 'picture', object : 'picture' },
    { title : 'state', object : 'state' },
    { title : 'create', object : 'create' },
];
const event = [
    { title : '', object : 'id' },
    { title : 'profile', object : 'profile' },
    { title : 'picture', object : 'picture' },
    { title : 'cost', object : 'cost' },
    { title : 'date', object : 'date' },
    { title : 'address', object : 'address' },
    { title : 'contact', object : 'contact' },
    { title : 'state', object : 'state' },
    { title : 'create', object : 'create' },
];
const product = [
    { title : '', object : 'id' },
    { title : 'profile', object : 'profile' },
    { title : 'picture', object : 'picture' },
    { title : 'cost', object : 'cost' },
    { title : 'state', object : 'state' },
    { title : 'create', object : 'create' },
];
const service = [
    { title : '', object : 'id' },
    { title : 'profile', object : 'profile' },
    { title : 'picture', object : 'picture' },
    { title : 'cost', object : 'cost' },
    { title : 'state', object : 'state' },
    { title : 'create', object : 'create' },

];
const form = {
    public : {
        create : formBuilder(public, false),
        edit : formBuilder(public, false),
        login : formBuilder([{
            title : 'access data',
            object : 'access',
        }], false),
        view : formBuilder(public, true),
    },
    category : {
        create : formBuilder(category, false),
        edit : formBuilder(category, false),
        view : formBuilder(category, true),
    },
    event : {
        create : formBuilder(event, false),
        edit : formBuilder(event, false),
        view : formBuilder(event, true),
    },
    product : {
        create : formBuilder(product, false),
        edit : formBuilder(product, false),
        view : formBuilder(product, true),
    },
    service : {
        create : formBuilder(service, false),
        edit : formBuilder(service, false),
        view : formBuilder(service, true),
    },
};
module.exports = {
    forms : form,
    form : form,
    names : {
        category : nameListBuilder(form['category']['view']),
        event : nameListBuilder(form['event']['view']),
        order : [
            'id',
            ['fk_public', 'public'],
            'approved',
            'deleted',
            'disable',
            ['createdAt', 'created'],
            ['updatedAt', 'updated'],
        ],
        product : nameListBuilder(form['product']['view']),
        public : nameListBuilder(form['public']['view']),
        service : nameListBuilder(form['service']['view']),
    },
    name : {
        category : nameListBuilder(form['category']['view']),
        event : nameListBuilder(form['event']['view']),
        order : [
            'id',
            ['fk_public', 'public'],
            'approved',
            'deleted',
            'disable',
            ['createdAt', 'created'],
            ['updatedAt', 'updated'],
        ],
        product : nameListBuilder(form['product']['view']),
        public : nameListBuilder(form['public']['view']),
        service : nameListBuilder(form['service']['view']),
    },
};