const { capitalize, plural } = require('../utils');
const allName = 'public'
const modelName = capitalize(allName);
const tableName = plural(allName);
module.exports = (sequelize, DataType) => {
	const Public = sequelize.define(modelName, {
        id : {
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
            type : DataType.INTEGER,
        },
        firstName : {
            allowNull : false,
            type : DataType.STRING,
        },
        lastName : {
            allowNull : false,
            type : DataType.STRING,
        },
        gender : {
            allowNull : false,
            type : DataType.STRING,
        },
        email : {
            allowNull : false,
            type : DataType.STRING,
            validate : {
                isEmail : true,
            },
        },
        password : {
            allowNull : false,
            defaultValue : '',
            type : DataType.STRING,
            // validate : {
            //     len : [8, 12],
            // },
        },
        disable : {
            allowNull : false,
            defaultValue : false,
            type : DataType.BOOLEAN,
        },
        createdAt : {
            allowNull : true,
            defaultValue: DataType.NOW,
            type : DataType.DATE,
        },
        updatedAt : {
            allowNull : true,
            defaultValue: DataType.NOW,
            type : DataType.DATE,
        },
    },
    {
        tableName : tableName,
        timestamps : true,
    });
	return Public;
};