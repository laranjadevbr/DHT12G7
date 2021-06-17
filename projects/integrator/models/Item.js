const {
    capitalize,
    plural,
} = require('../utils');
const {
    everyoneCreate,
    everyoneState,
    id,
} = require('../utils/sequelize');
const allName = 'item';
module.exports = (sequelize, DataType) => {
	const Item = sequelize.define(capitalize(allName), {
        ...id(DataType),
        fk_order : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        fk_event : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        fk_product : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        fk_service : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        ...everyoneState(DataType),
        ...everyoneCreate(DataType),
    },
    {
        tableName : plural(allName),
        timestamps : false,
    });
    return Item;
};