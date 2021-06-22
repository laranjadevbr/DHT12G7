const {
    getFirstUpperCase,
    getPlural,
} = require('../utils');
const {
    getModelPublic,
} = require('../utils/sequelize');
const allName = 'public';
module.exports = (sequelize, DataType) => {
	const Public = sequelize.define(getFirstUpperCase(allName), {
        ...getModelPublic(DataType),
    },
    {
        tableName : getPlural(allName),
        timestamps : false,
    });
    Public.associate = (modelsList) => {
        Public.hasMany(modelsList.Order, {
            foreignKey : 'fk_public',
            as : 'order',
        });
    };
	return Public;
};