const { Op } = require("sequelize");
const {
    Recipe,
} = require('../models');
const DBconfig = require('../config');
const Sequelize = require("sequelize");
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
} = require('../utils');
const session = (req, res, next) => {
    return req.session.user;
};
module.exports = {
    // OK!
    a : async (req, res, next) => {
        const DBconnection = new Sequelize(DBconfig);
        const DBresult = await DBconnection.query('select * from recipes');
        return res.send(DBresult);
    },
    // OK!
    b : async (req, res, next) => {
        const DBconnection = new Sequelize(DBconfig);
        const DBresult = await DBconnection.query('select * from recipes', {
            type : Sequelize.QueryTypes.SELECT,
        });
        return res.send(DBresult);
    },
    // OK!
    c : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) { return res.send('Here you need a numeric parameter!'); } else {
            const DBconnection = new Sequelize(DBconfig);
            const DBresult = await DBconnection.query('select * from recipes where id = :id', {
                replacements : {
                    id : id,
                },
                type : Sequelize.QueryTypes.SELECT,
            });
            return res.send(DBresult);
        }
    },
    // OK!
    d : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) { return res.send('Here you need a numeric parameter!'); } else {
            const index = await Recipe.findAll();
            return res.send(index[id]);
        }
    },
    // OK!
    e : async (req, res, next) => {
        const index = await Recipe.findAll();
        return res.send(index);
    },
    // OK!
    f : async (req, res, next) => {
        const { id } = req.params;
        const index = await Recipe.findOne({
            where : {
                id : id,
            },
        });
        return res.send(index);
    },
    // OK!
    g : async (req, res, next) => {
        const amount = 2;
        const { page = 1 } = req.query;
        const {
            count ,
            rows : index,
        } = await Recipe.findAndCountAll({
            limit : amount,
            offset : Number((page - 1) * amount),
        });
        const fullPage = Math.round(count / amount);
        const nextPage = Number(page) < Number(fullPage) ? Number(page) + 1 : Number(fullPage);
        const prevPage = Number(page) <= 1 ? 1 : Number(page) - 1;
        return res.send({
            index : index,
        });
    },
    // OK!
    h : async (req, res, next) => {
        let index = '';
        index += 'cou: ' + await Recipe.count()   + ', ';
        index += 'min: ' + await Recipe.min('id') + ', ';
        index += 'max: ' + await Recipe.max('id') + ', ';
        index += 'sum: ' + await Recipe.sum('id') + ', ';
        index += 'mea: ' + await Recipe.sum('id') / await Recipe.count() + '.'
        return res.send(index);
    },
    // OK!
    i : async (req, res, next) => {
        const amount = 2;
        const { key } = req['query'];
        const index = await Recipe.findAll({
            where : {
                name : {
                    [Op.like] : `%${ key }%`
                },
            },
            order : [
                // ['name', 'DESC']
                ['name', 'ASC']
            ],
            limit : amount,
            offset : amount,
        });
        // http://localhost:3000/lab/i?key=lorem
        return res.send(index);
    },
    j : async (req, res, next) => {
        const allNames = '_j';        
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    k : async (req, res, next) => {
        const allNames = '_k';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    l : async (req, res, next) => {
        const allNames = '_l';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    m : async (req, res, next) => {
        const allNames = '_m';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    n : async (req, res, next) => {
        const allNames = '_n';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    o : async (req, res, next) => {
        const allNames = '_o';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    p : async (req, res, next) => {
        const allNames = '_p';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    q : async (req, res, next) => {
        const allNames = '_q';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    r : async (req, res, next) => {
        const allNames = '_r';
        const { key = '' } = req.query;
        return res.render(allNames, {
            capitalize,
            cleaner,
            currency,
            key,
            roman,
            script : script(allNames),
            searchAction : urlPath('/lab/', 'r'),
            session,
            validate,
        });
    },
    s : async (req, res, next) => {
        const allNames = '_s';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    t : async (req, res, next) => {
        const allNames = '_t';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    u : async (req, res, next) => {
        const allNames = '_u';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    v : async (req, res, next) => {
        const allNames = '_v';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    w : async (req, res, next) => {
        const allNames = '_w';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    x : async (req, res, next) => {
        const allNames = '_x';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    y : async (req, res, next) => {
        const allNames = '_y';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
    z : async (req, res, next) => {
        const allNames = '_z';
        return res.render(allNames, {
            script : script(allNames),
            capitalize,
            cleaner,
            currency,
            roman,
            session,
            validate,
        });
    },
};