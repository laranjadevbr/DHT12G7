const {
    forms : {
        public : {
            create,
            edit,
            view,
            login,
        }
    },
    names : {
        public : item,
    }
} = require('../database/elements');
const {
    generous,
    lorem : {
        description,
    },
    inputType : inputType,
    name : {
        first,
        last,
    }
} = option = require('../database/options');
const {
    Public,
    Order,
} = require('../models');
const prefix = '/admin/';
let {
    forEveryone,
    // 
    getCNPJNumber,
    getCPFNumber,
    getDOCNumber,
    getHash,
    getModelPagination,
    getModelParams,
    getModelSearchParams,
    getPageTitle,
    getPhoneNumber,
    getRandomDate,
    getRandomNumber,
    getScript,
    getURLPath,
    getViewName,
    isEqual,
} = require('../utils');
let getRandomIndex = (require, array) => {
    const result = [];
    for (let i = 0; i < require[array]['length']; i++)
        require[array][i]['option'] !== '' ? result.push(require[array][i]['option']) : undefined;
    return result[Math.floor(Math.random() * result['length'])];
};
const name = [];
let pushIndex = (index) => {
    const result = [];
    for (let i = 0; i < first[index]['length']; i++) {
        result.push({
            first : first[index][i].toLowerCase(),
            last : last[Math.floor(Math.random() * last['length'])].toLowerCase(),
            gender : index.toLowerCase(),
        });
    };
    return result;
};
for (let i = 0; i < generous['length']; i++) {
    generous[i]['option'] !== '' ? name.push(...pushIndex(generous[i]['option'])) : undefined;
}
const bulkList = [];
for (let i = 0; i < name['length']; i++) {
    let email = name[i]['first'].substr(0, 1);
    email += name[i]['last'].substr(0, 1);
    let password = getRandomNumber(100000, 999999);
    email += password;
    email += '@';
    email += getRandomIndex(option, 'emails');
    email += '.com';
    password = getHash(password);
    bulkList.push({
        title : String(name[i]['first'] + ' ' + name[i]['last']),
        description : description,
        gender : name[i]['gender'],
        birthdate : getRandomDate(
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate()),
        ),
        status : getRandomIndex(option, 'status'),
        cpf : getCPFNumber(),
        rg : getDOCNumber([2, 3, 3, 1]),
        cep : getDOCNumber([5, 3]),
        state : getRandomIndex(option, 'uf'),
        email : String(email).toLowerCase(),
        phone : getPhoneNumber([2, 1, 4, 4]),
        cnpj : getCNPJNumber([2, 3, 3, 4, 2]),
        profession : getRandomIndex(option, 'profession'),
        curriculum : description,
        salary : getRandomIndex(option, 'salary'),
        accesskey : String(email).toLowerCase(),
        password : password,
        confirmation : password,
    });
}
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(getURLPath(prefix, 'all'));
    },
    all : async (req, res, next) => {
        const amount = 2;
        const {
            page = 1,
            key = '',
        } = req['query'];
        const {
            count,
            rows : index,
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : key,
                column : 'title',
                limit : amount,
                offset : (page - 1) * amount,
            }),
        });
        const allNames = 'all';
        return res.render(getViewName(prefix, allNames), {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName(prefix),
            script : getScript(allNames),
            searchAction : getURLPath(prefix, 'search'),
            ...forEveryone(),
            ...getModelPagination({
                count : count,
                amount : amount,
                page : page,
            }),
        });
    },
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req.params;
        const index = await Public.findOne({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : id,
                column : 'id',
            }),
        });
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, 'all'),
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'come back',
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    create : async (req, res, next) => {
        const allNames = 'create';
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, allNames),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    store : async (req, res, next) => {
        req['body']['password'] = getHash(req['body']['password']);
        const index = await Public.create({
            ...req['body'],
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Public.findOne({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, allNames) + '/' + id + '?_method=PUT',
                enctype : '',
                method : 'POST',
            },
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    update : async (req, res, next) => {
        const { id } = req.params;
        const index = await Public.update({
            ...req['body'],
        },
        {
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Public.destroy({
            ...getModelParams({
                param : id,
                column : 'id',
            }),
        });
        return res.redirect(getURLPath(prefix, 'all'));
    },
    login : async (req, res, next) => {
        const allNames = 'login';
        return res.render(getViewName(prefix, allNames), {
            form : {
                action : getURLPath(prefix, 'authenticate'),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : login,
            inputType : inputType,
            pageTitle : getPageTitle(prefix, allNames),
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    authenticate : async (req, res, next) => {
        let screen = (method, allNames) => {
            return method.render(getViewName(prefix, allNames), {
                form : {
                    action : getURLPath(prefix, allNames),
                    enctype : '',
                    method : 'POST',
                },
                btnTitle : allNames,
                formElement : login,
                inputType : inputType,
                pageTitle : getPageTitle(prefix, allNames),
                script : getScript(allNames),
                ...forEveryone(),
            });
        };
        const {
            email,
            password,
        } = req['body'];
        const user = await Public.findOne({
            ...getModelParams({
                param : email,
                column : 'email',
            }),
        });
        if (!user) screen(res, 'login');
        if (!isEqual(password, user['password'])) screen(res, 'login');
        user['password'] = undefined;
        req.session.user = user;
        return res.redirect(getURLPath(prefix, 'all'));
    },
    logout : async (req, res, next) => {
        req.session.destroy();
        return res.redirect('/');
    },
    bulk : async (req, res, next) => {
        const index = await Public.bulkCreate(bulkList);
        return res.send(index);
    },
    search : async (req, res, next) => {
        const amount = 2;
        const {
            page = 1,
            key = '',
        } = req['query'];
        const {
            count,
            rows : index,
        } = await Public.findAndCountAll({
            ...getModelParams({
                model : Order,
                alias : 'order',
                param : key,
                column : 'id',
                limit : amount,
                offset : (page - 1) * amount,
            }),
            ...getModelSearchParams({
                array : [
                    'description',
                    'title',
                ],
                key : key,
            }),
        });
        const allNames = 'all';
        return res.render(getViewName(prefix, allNames), {
            index : index,
            item : item,
            inputType : inputType,
            key : key,
            pageTitle : getPageTitle(prefix, allNames),
            pathPrefix : getViewName(prefix),
            script : getScript(allNames),
            searchAction : getURLPath(prefix, 'search'),
            ...forEveryone(),
            ...getModelPagination({
                count : count,
                amount : amount,
                page : page,
            }),
        });
    },
}