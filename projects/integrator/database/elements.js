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
        index[i]['note'] !== 'deleted' ? result.push(index[i]['name']) : undefined;
    return result;
}
const public = [
    { title : '', object : 'everyone-id' },
    { title : 'profile', object : 'everyone-profile' },
    { title : '', object : 'public-add' },
    { title : '', object : 'everyone-picture' },
    // { title : 'hobbies', object : 'public-hobbies' },
    { title : 'document', object : 'public-document' },
    { title : 'address', object : 'everyone-address' },
    { title : 'contact', object : 'everyone-contact' },
    { title : 'curriculum', object : 'public-curriculum' },
    { title : 'company', object : 'public-company' },
    { title : 'access', object : 'public-access' },
    { title : 'state', object : 'everyone-state' },
    { title : '', object : 'public-level' },
    { title : 'create', object : 'everyone-create' },
];
const category = [
    { title : '', object : 'everyone-id' },
    { title : 'profile', object : 'everyone-profile' },
    { title : 'picture', object : 'everyone-picture' },
    { title : 'state', object : 'everyone-state' },
    { title : 'create', object : 'everyone-create' },
];
const event = [
    { title : '', object : 'everyone-id' },
    { title : 'profile', object : 'everyone-profile' },
    { title : 'picture', object : 'everyone-picture' },
    { title : 'cost', object : 'everyone-cost' },
    { title : 'date', object : 'event-date' },
    { title : 'address', object : 'everyone-address' },
    { title : 'contact', object : 'everyone-contact' },
    { title : 'state', object : 'everyone-state' },
    { title : 'create', object : 'everyone-create' },
];
const product = [
    { title : '', object : 'everyone-id' },
    { title : 'profile', object : 'everyone-profile' },
    { title : 'picture', object : 'everyone-picture' },
    { title : 'cost', object : 'everyone-cost' },
    { title : 'state', object : 'everyone-state' },
    { title : 'create', object : 'everyone-create' },
];
const service = [
    { title : '', object : 'everyone-id' },
    { title : 'profile', object : 'everyone-profile' },
    { title : 'picture', object : 'everyone-picture' },
    { title : 'cost', object : 'everyone-cost' },
    { title : 'state', object : 'everyone-state' },
    { title : 'create', object : 'everyone-create' },

];
const forms = {
    public : {
        create : formBuilder(public, false),
        edit : formBuilder(public, false),
        login : formBuilder([{
            title : 'access data',
            object : 'public-access',
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
    forms : forms,
    names : {
        category : nameListBuilder(forms['category']['view']),
        event : nameListBuilder(forms['event']['view']),
        order : [
            'id',
            ['fk_public', 'public'],
            'approved',
            'deleted',
            'disable',
            ['createdAt', 'created'],
            ['updatedAt', 'updated'],
        ],
        product : nameListBuilder(forms['product']['view']),
        public : nameListBuilder(forms['public']['view']),
        service : nameListBuilder(forms['service']['view']),
    }
};