const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { Public } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const authConfig = require('../config/auth.json');
const {
    capitalize,
    plural,
} = require('../utils');
const emailList = [
    'gmail',
    'hotmail',
    'yahoo'
];
const {
    firstName,
    lastName
} = require('../database');
let addIndex = (index) => {    
    for (let i = 0; i < firstName[index]['length']; i++) {
        logList.push({
            firstName : firstName[index][i],
            lastName : lastName[Math.floor(Math.random() * lastName['length'])],
            gender : index,
        });
    };
};
const logList = [
    ...addIndex('men'),
    ...addIndex('women'),
];
const bulkList = [];
for (let i = 0; i < logList['length']; i++) {
    let email = logList[i]['firstName'].substr(0, 1);
    email += logList[i]['lastName'].substr(0, 1);
    let password = Math.floor(Math.random() * 999999 + 100000);
    email += password + '@' + emailList[Math.floor(Math.random() * emailList['length'])] + '.com';
    bulkList.push({
        firstName : capitalize(logList[i]['firstName']),
        lastName : capitalize(logList[i]['lastName']),
        gender : capitalize(logList[i]['gender']),
        email : String(email).toLowerCase(),
        password : bcrypt.hashSync(String(password), 10),
    });
};
// [1, 2, 3].map((n) => { return Math.pow(n, 2); });
// [1, 2, 3].map(n => n ** 2);
const action = {
    // TDD : Test Driven Development.
    index : async (req, res, next) => {
        return res.redirect('/public/all');
    },
    all : async (req, res, next) => {
        const {
            key,
            disable,
        } = req.query;
        // http://localhost:3333/public/all?key=ana&disable=1
        const items = [
            'firstName',
            'lastName',
            'gender',
            'email',
        ];
        const opList = [];
        for (let i = 0; i <= Number(items['length'] - 1); i++) {
            opList.push({
                [items[i]] : {
                    [Op.like] : `%${ key }%`,
                },
            });
        };
        let findParams;
        if (key) {
            if (disable) {
                findParams = {
                    where : {
                        [Op.or] : opList,
                        disable : disable,
                    },
                };
            } else {
                findParams = {
                    where : {
                        [Op.or] : opList,
                    },
                };
            };
        } else {
            if (disable) {
                findParams = {
                    where : {
                        disable : disable,
                    },
                };
            } else {
                findParams = {
                    where : {
                    },
                };
            };
        };
        const {
            count,
            rows
        } = await Public.findAndCountAll(findParams).then(result => {
            return res.status(200).json(result['rows']);
        }).catch(error => {
            return res.status(400).json(error);
        });
    },
    one : async (req, res, next) => {
        const { id } = req.params;
        if (!id) { return res.redirect('/public/all'); } else {
            const index = await Public.findByPk(id).then(result => {
                return res.status(200).json(result);
            }).catch(error => {
                return res.status(400).json(error);
            });
        };
    },
    
    // -----

    create : async (req, res, next) => {
    },
    store : async (req, res, next) => {
        try {
            const index = await Public.create({
                ...req.body,
            });
            return res.status(201).json(index);
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    
    // -----

    edit : async (req, res, next) => {
    },
    update : async (req, res, next) => {
        // O registro foi encontrado? Sim. Não.
        // O registro foi alterado? Sim. Não.
        try {
            const { id } = req.params;
            const {
                firstName,
                lastName,
                gender,
                email,
            } = req.body;
            const index = await Public.findByPk(id);
            if (!index) {
                return res.status(200).json({
                    message : 'the index ' + id + ' is not found.',
                });
            } else {
                index.update({
                    firstName : firstName,
                    lastName : lastName,
                    gender : gender,
                    email : email,
                });
                return res.status(200).json(index);
            }
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    disable : async (req, res, next) => {
        try {
            const { id } = req.params;
            const index = await Public.findByPk(id);
            if (!index) {
                return res.status(200).json({
                    message : 'the index ' + id + ' is not found.',
                });
            } else {
                index.update({
                    disable : true,
                });
                return res.status(200).json(index);
            };
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    destroy : async (req, res, next) => {
        try {
            const { id } = req.params;
            const index = await Public.findByPk(id);
            if (!index) {
                return res.status(200).json({
                    message : 'the index ' + id + ' is not found.',
                });
            } else {
                index.destroy();
                return res.status(200).json({
                    message : 'the index ' + id + ' was destroyed.',
                });
            };
        } catch (error) {
            return res.status(400).json(error);
        };
    },

    // -----

    login : async (req, res, next) => {
    },
    authenticate : async (req, res, next) => {
        const {
            email,
            password
        } = req.body;
        const index = await Public.findOne({
            where : {
                email : email,
            },
        });
        if (!index) {
            return res.status(400).json({
                error : 'Index not found!',
            });
        };
        if (!await bcrypt.compareSync(password, index['password'])) {
            return res.status(400).json({
                error : 'Invalid password!',
            });
        };
        index['password'] = undefined;
        const token = jwt.sign({
            email : index['email'],
        },
        authConfig['secret'], {
            expiresIn : authConfig['expiresIn'],
        });
        return res.status(200).json({
            user : index,
            token : token,
        });
    },
    authenticated : async (req, res, next) => {
        const index = await Public.findOne({
            where : {
                email : req['userEmail'],
            },
        }).then(result => {
            result['password'] = undefined;
            return res.status(200).json({
                user : result,
            });
        }).catch(error => {
            return res.status(400).json(error);
        });
    },
    logout : async (req, res, next) => {
    },

    // -----

    search : async (req, res, next) => {
    },
    bulk : async (req, res, next) => {
        const index = await Public.bulkCreate(bulkList);
        return res.send(index);
    },
}
module.exports = action;