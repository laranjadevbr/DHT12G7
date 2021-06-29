const formConstructor = (array, disabled) => {
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
let itemsListConstrucor = (index) => {
    const result = [];
    for (let i = 0; i < index['length']; i++)
        index[i]['note'] !== 'deleted' ?
        result.push(index[i]['name']) :
        undefined;
    return result;
}
const form = {
    public : {
        create : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : '', object : 'add' },
            { title : '', object : 'picture' },
            // { title : 'hobbies', object : 'hobbies' },
            { title : 'document', object : 'document' },
            { title : 'address', object : 'address' },
            { title : 'contact', object : 'contact' },
            { title : 'curriculum', object : 'curriculum' },
            { title : 'company', object : 'company' },
            { title : 'access data', object : 'access' },
            // { title : 'state', object : 'state' },
            // { title : '', object : 'level' },
            // { title : 'create', object : 'create' },
        ], false),
        edit : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : '', object : 'add' },
            { title : '', object : 'picture' },
            // { title : 'hobbies', object : 'hobbies' },
            { title : 'document', object : 'document' },
            { title : 'address', object : 'address' },
            { title : 'contact', object : 'contact' },
            { title : 'curriculum', object : 'curriculum' },
            { title : 'company', object : 'company' },
            { title : 'access data', object : 'access' },
            { title : 'state', object : 'state' },
            { title : '', object : 'level' },
            // { title : 'create', object : 'create' },
        ], false),
        login : formConstructor([
            { title : 'access data', object : 'login' },
        ], false),
        view : formConstructor([
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
            { title : 'access data', object : 'access' },
            { title : 'state', object : 'state' },
            { title : '', object : 'level' },
            { title : 'create', object : 'create' },
        ], true),
    },
    category : {
        create : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            // { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        edit : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        view : formConstructor([
            { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'state', object : 'state' },
            { title : 'create', object : 'create' },
        ], true),
    },
    event : {
        create : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'date', object : 'date' },
            { title : 'address', object : 'address' },
            // { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        edit : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'date', object : 'date' },
            { title : 'address', object : 'address' },
            { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        view : formConstructor([
            { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'date', object : 'date' },
            { title : 'address', object : 'address' },
            { title : 'state', object : 'state' },
            { title : 'create', object : 'create' },
        ], true),
    },
    product : {
        create : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            // { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        edit : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        view : formConstructor([
            { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'state', object : 'state' },
            { title : 'create', object : 'create' },
        ], true),
    },
    service : {
        create : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            // { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        edit : formConstructor([
            // { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'state', object : 'state' },
            // { title : 'create', object : 'create' },
        ], false),
        view : formConstructor([
            { title : '', object : 'id' },
            { title : 'profile', object : 'profile' },
            { title : 'picture', object : 'picture' },
            { title : 'cost', object : 'cost' },
            { title : 'state', object : 'state' },
            { title : 'create', object : 'create' },
        ], true),
    },
};
module.exports = {
    form : form,
    name : {
        category : itemsListConstrucor(form['category']['view']),
        event : itemsListConstrucor(form['event']['view']),
        order : [
            'id',
            ['fk_public', 'public'],
            'approved',
            'deleted',
            'disable',
            ['createdAt', 'created'],
            ['updatedAt', 'updated'],
        ],
        product : itemsListConstrucor(form['product']['view']),
        public : itemsListConstrucor(form['public']['view']),
        service : itemsListConstrucor(form['service']['view']),
    },
};