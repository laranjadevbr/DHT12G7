const config = require('../config');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const {
    Public,
} = require('../models');
const {
    everyoneView,
    getScript,
    getURLPath,
} = require('../utils');
module.exports = {
    a : async (req, res, next) => {
        const connection = new Sequelize(config);
        const result = await connection.query('select * from publics');
        return res.send(result);
    },
    b : async (req, res, next) => {
        const connection = new Sequelize(config);
        const result = await connection.query('select * from publics', {
            type : Sequelize.QueryTypes.SELECT,
        });
        return res.send(result);
    },
    c : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) {
            return res.send('You need a numeric parameter!');
        } else {
            const connection = new Sequelize(config);
            const result = await connection.query('select * from publics where id = :id', {
                replacements : {
                    id : id,
                },
                type : Sequelize.QueryTypes.SELECT,
            });
            return res.send(result);
        }
    },
    d : async (req, res, next) => {
        const { id } = req['params'];
        if (!id) {
            return res.send('You need a numeric parameter!');
        } else {
            const index = await Public.findAll();
            return res.send(index[id]);
        }
    },
    e : async (req, res, next) => {
        const index = await Public.findAll();
        return res.send(index);
    },
    f : async (req, res, next) => {
        const { id } = req['params'];
        const index = await Public.findOne({
            where : {
                id : id,
            },
        });
        return res.send({
            index : index,
        });
    },
    g : async (req, res, next) => {
        const amount = 2;
        const {
            page = 1,
        } = req['query'];
        const {
            count ,
            rows : index,
        } = await Public.findAndCountAll({
            limit : amount,
            offset : Number((page - 1) * amount),
        });
        return res.send({
            index : index,
        });
    },
    h : async (req, res, next) => {
        const count = await Public.count();
        const min = await Public.min('id');
        const max = await Public.max('id');
        const sum = await Public.sum('id');
        const mean = await Public.sum('id') / await Public.count();
        return res.send({
            index : {
                count : count,
                min : min,
                max : max,
                sum : sum,
                mean : mean,
            }
        });
    },
    i : async (req, res, next) => {
        const amount = 2;
        const {
            key = '',
        } = req['query'];
        // http://localhost:8888/lab/i?key=ana
        const index = await Public.findAll({
            where : {
                title : {
                    [Op.like] : `%${ key }%`
                },
            },
            order : [
                ['title', 'ASC']
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
            ...everyoneView(),
        });
    },
    k : async (req, res, next) => {
        const allNames = '_k';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    l : async (req, res, next) => {
        const allNames = '_l';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    m : async (req, res, next) => {
        const allNames = '_m';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    n : async (req, res, next) => {
        const allNames = '_n';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    o : async (req, res, next) => {
        const allNames = '_o';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    p : async (req, res, next) => {
        const allNames = '_p';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    q : async (req, res, next) => {
        const allNames = '_q';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    r : async (req, res, next) => {
        const {
            key = '',
        } = req['query'];
        const allNames = '_r';
        return res.render(allNames, {
            script : getScript(allNames),
            searchAction : getURLPath({
                prefix : '/lab/',
                suffix : 'r',
            }),
            ...everyoneView(),
        });
    },
    s : async (req, res, next) => {
        const allNames = '_s';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    t : async (req, res, next) => {
        const allNames = '_t';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    u : async (req, res, next) => {
        const allNames = '_u';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    v : async (req, res, next) => {
        const allNames = '_v';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    w : async (req, res, next) => {
        const allNames = '_w';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    x : async (req, res, next) => {
        const allNames = '_x';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    y : async (req, res, next) => {
        const allNames = '_y';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
    z : async (req, res, next) => {
        const allNames = '_z';
        return res.render(allNames, {
            script : getScript(allNames),
            ...everyoneView(),
        });
    },
};