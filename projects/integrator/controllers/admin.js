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
    emails,
    genders,
    lorem : {
        title,
        description,
    },
    inputType : inputType,
    names : {
        firstName,
        lastName,
    }
} = option = require('../database/options');
const {
    Public,
    Order,
} = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const prefix = '/admin/';
const {
    capitalize,
    cleaner,
    currency,
    dismember,
    getCNPJ,
    getCPF,
    getNumber,
    getPhone,
    getRandomDate,
    getRandomInt,
    navbar,
    onlyNumbers,
    pageTitle,
    plural,
    readjust,
    roman,
    saver,
    script,
    urlPath,
    validate,
    viewName,
    getModelParams,
} = require('../utils');
const session = (req, res, next) => {
    return req.session.user;
};
let getIndexes = (array) => {
    const result = [];
    for (let i = 0; i < option[array]['length']; i++)
        option[array][i][1] ? result.push(option[array][i][0]) : undefined;
    return capitalize(result[Math.floor(Math.random() * result['length'])]);
};

let pushIndex = (index) => {
    let array = [];
    for (let i = 0; i < firstName[index]['length']; i++) {
        array.push({
            firstName : firstName[index][i],
            lastName : lastName[Math.floor(Math.random() * lastName['length'])],
            gender : index,
        });
    };
    return array;
};
const userList = [];
for (let i = 0; i < genders['length']; i++)
    if (genders[i][0] !== '') userList.push(...pushIndex(genders[i][0]));

const bulkList = [];
for (let i = 0; i < userList['length']; i++) {
    let email = userList[i]['firstName'].substr(0, 1);
    email += userList[i]['lastName'].substr(0, 1);
    let password = getRandomInt(100000, 999999);
    email += password;
    email += '@';
    email += emails[Math.floor(Math.random() * emails['length'])];
    email += '.com';
    password = bcrypt.hashSync(String(password), 10);
    bulkList.push({
        title : String(userList[i]['firstName'] + ' ' + userList[i]['lastName']),
        description : description,
        gender : capitalize(userList[i]['gender']),
        birthdate : getRandomDate(
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            new Date(new Date().getFullYear() - 100, new Date().getMonth(), new Date().getDate()),
        ),
        status : getIndexes('status'),
        cpf : getCPF(),
        rg : getNumber([2, 3, 3, 1]),
        cep : getNumber([5, 3]),
        state : getIndexes('uf'),
        email : String(email).toLowerCase(),
        phone : getPhone([2, 1, 4, 4]),
        cnpj : getCNPJ([2, 3, 3, 4, 2]),
        profession : getIndexes('profession'),
        curriculum : description,
        salary : getIndexes('salary'),
        accesskey : String(email).toLowerCase(),
        password : password,
        confirmation : password,
    });
}
module.exports = {
    index : async (req, res, next) => {
        return res.redirect(urlPath(prefix, 'all'));
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
            ...getModelParams(Order, 'order'),
            limit : amount,
            offset : (page - 1) * amount,
        });
        const fullPage = Math.round(count / amount);
        const nextPage = Number(page) < Number(fullPage) ? Number(page) + 1 : Number(fullPage);
        const prevPage = Number(page) <= 1 ? 1 : Number(page) - 1;
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : index,
            item : item,
            inputType : inputType,
            key,
            nextPage : nextPage,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            prevPage : prevPage,
            script : script(allNames),
            searchAction : urlPath(prefix, 'search'),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    one : async (req, res, next) => {
        const allNames = 'one';
        const { id } = req.params;
        const index = await Public.findOne({
            ...getModelParams(Order, 'order'),
            where : {
                id : id,
            },
        });
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'all'),
                enctype : '',
                method : 'POST'
            },
            btnTitle : 'come back',
            formElement : view,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    create : async (req, res, next) => {
        const allNames = 'create';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, allNames),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : create,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    store : async (req, res, next) => {
        req.body['password'] = bcrypt.hashSync(req.body['password'], 10);
        const index = await Public.create({
            ...req['body'],
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    edit : async (req, res, next) => {
        const allNames = 'edit';
        const { id } = req['params'];
        const index = await Public.findOne({
            where : {
                id : id,
            },
        });
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, allNames) + '/' + id + '?_method=PUT',
                enctype : '',
                method : 'POST',
            },
            btnTitle : 'update',
            formElement : edit,
            index : index,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    update : async (req, res, next) => {
        const { id } = req.params;
        const index = await Public.update({
            ...req['body'],
        },
        {
            where : {
                id : id,
            },
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    destroy : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Public.destroy({
            where : {
                id : id,
            }
        });
        return res.redirect(urlPath(prefix, 'all'));
    },
    login : async (req, res, next) => {
        const allNames = 'login';
        return res.render(viewName(prefix, allNames), {
            form : {
                action : urlPath(prefix, 'authenticate'),
                enctype : '',
                method : 'POST',
            },
            btnTitle : allNames,
            formElement : login,
            inputType : inputType,
            pageTitle : pageTitle(prefix, allNames),
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    authenticate : async (req, res, next) => {
        let screen = (method, allNames) => {
            return method.render(viewName(prefix, allNames), {
                form : {
                    action : urlPath(prefix, allNames),
                    enctype : '',
                    method : 'POST',
                },
                btnTitle : allNames,
                formElement : login,
                inputType : inputType,
                pageTitle : pageTitle(prefix, allNames),
                script : script(allNames),
                capitalize,
                cleaner,
                currency,
                roman,
                session,
                validate,
            });
        };
        const {
            email,
            password,
        } = req.body;
        const user = await Public.findOne({
            where : {
                email : email,
            },
        });
        if (!user) {
            screen(res, 'login');
        };
        if (!bcrypt.compareSync(password, user['password'])) {
            screen(res, 'login');
        };
        user['password'] = undefined;
        req.session.user = user;
        return res.redirect(urlPath(prefix, 'all'));
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
        const indexes = [];
        for (let i = 0; i < items['length']; i++) {
            indexes.push({
                [items[i]] : {
                    [Op.like] : `%${ key }%`,
                },
            });
        };
        const {
            count,
            rows : index,
        } = await Public.findAndCountAll({
            ...getModelParams(Order, 'order'),
            limit : amount,
            offset : (page - 1) * amount,
            where : {
                [Op.or] : indexes,
            },
        });
        const fullPage = Math.round(count / amount);
        const nextPage = Number(page) < Number(fullPage) ? Number(page) + 1 : Number(fullPage);
        const prevPage = Number(page) <= 1 ? 1 : Number(page) - 1;
        const allNames = 'all';
        return res.render(viewName(prefix, allNames), {
            fullPage : fullPage <= 1 ? undefined : fullPage,
            index : index,
            item : item,
            inputType : inputType,
            key,
            nextPage : nextPage,
            pageTitle : pageTitle(prefix, allNames),
            pathPrefix : viewName(prefix),
            prevPage : prevPage,
            script : script(allNames),
            searchAction : urlPath(prefix, 'search'),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
}