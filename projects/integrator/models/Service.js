const {
    capitalize,
    plural,
} = require('../utils');
const {
    everyoneCost,
    everyoneCreate,
    everyonePicture,
    everyoneProfile,
    everyoneState,
    id,
} = require('../utils/sequelize');
const allName = 'service';
module.exports = (sequelize, DataType) => {
	const Service = sequelize.define(capitalize(allName), {
        ...id(DataType),
        fk_category : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        ...everyoneProfile(DataType),
        ...everyonePicture(DataType),
        ...everyoneCost(DataType),
        ...everyoneState(DataType),
        ...everyoneCreate(DataType),
    },
    {
        tableName : plural(allName),
        timestamps : false,
    });
    Service.associate = (modelsList) => {
        Service.belongsTo(modelsList.Category, {
            foreignKey : 'fk_category',
            as : 'category',
        });
        Service.belongsToMany(modelsList.Order, {
            foreignKey : 'fk_order',
            as : 'order',
            through : modelsList.Item,
        });
    };
	return Service;
};