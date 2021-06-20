const { Op } = require("sequelize");
const {
    Recipe,
} = require('../models');
const config = require('../config');
const Sequelize = require('sequelize');
const {
    forEveryone,
    getScript,
    getURLPath,
} = require('../utils');
module.exports = {
    // OK!
    a : async (req, res, next) => {
        const connection = new Sequelize(config);
        const result = await connection.query('select * from recipes');
        return res.send(result);
    },
    // OK!
    b : async (req, res, next) => {
        const connection = new Sequelize(config);
        const result = await connection.query('select * from recipes', {
            type : Sequelize.QueryTypes.SELECT,
        });
        return res.send(result);
    },
    // OK!
    c : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) {
            return res.send('Here you need a numeric parameter!');
        } else {
            const connection = new Sequelize(config);
            const result = await connection.query('select * from recipes where id = :id', {
                replacements : {
                    id : id,
                },
                type : Sequelize.QueryTypes.SELECT,
            });
            return res.send(result);
        }
    },
    // OK!
    d : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) {
            return res.send('Here you need a numeric parameter!');
        } else {
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
        const { id } = req['params'];
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
        const {
            page = 1,
        } = req['query'];
        const {
            count ,
            rows : index,
        } = await Recipe.findAndCountAll({
            limit : amount,
            offset : Number((page - 1) * amount),
        });
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
        const {
            key = '',
        } = req['query'];
        const index = await Recipe.findAll({
            where : {
                name : {
                    [Op.like] : `%${ key }%`
                },
            },
            order : [
                ['name', 'ASC']
            ],
            limit : amount,
            offset : amount,
        });
        return res.send(index);
    },
    j : async (req, res, next) => {
        const allNames = '_j';        
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    k : async (req, res, next) => {
        const allNames = '_k';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    l : async (req, res, next) => {
        const allNames = '_l';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    m : async (req, res, next) => {
        const allNames = '_m';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    n : async (req, res, next) => {
        const allNames = '_n';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    o : async (req, res, next) => {
        const allNames = '_o';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    p : async (req, res, next) => {
        const allNames = '_p';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    q : async (req, res, next) => {
        const allNames = '_q';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    r : async (req, res, next) => {
        const allNames = '_r';
        const {
            key = '',
        } = req.query;
        return res.render(allNames, {
            script : getScript(allNames),
            searchAction : getURLPath('/lab/', 'r'),
            ...forEveryone(),
        });
    },
    s : async (req, res, next) => {
        const allNames = '_s';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    t : async (req, res, next) => {
        const allNames = '_t';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    u : async (req, res, next) => {
        const allNames = '_u';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    v : async (req, res, next) => {
        const allNames = '_v';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    w : async (req, res, next) => {
        const allNames = '_w';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    x : async (req, res, next) => {
        const allNames = '_x';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    y : async (req, res, next) => {
        const allNames = '_y';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
    z : async (req, res, next) => {
        const allNames = '_z';
        return res.render(allNames, {
            script : getScript(allNames),
            ...forEveryone(),
        });
    },
};