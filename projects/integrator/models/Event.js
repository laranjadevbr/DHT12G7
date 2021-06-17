const {
    capitalize,
    plural,
} = require('../utils');
const {
    eventDate,
    everyoneAddress,
    everyoneContact,
    everyoneCost,
    everyoneCreate,
    everyonePicture,
    everyoneProfile,
    everyoneState,
    id,
} = require('../utils/sequelize');
const allName = 'event';
module.exports = (sequelize, DataType) => {
	const Event = sequelize.define(capitalize(allName), {
        ...id(DataType),
        fk_category : {
            allowNull : false,
            type : DataType.INTEGER,
        },
        ...everyoneProfile(DataType),
        ...everyonePicture(DataType),
        ...everyoneCost(DataType),
        ...eventDate(DataType),
        ...everyoneAddress(DataType),
        ...everyoneContact(DataType),
        ...everyoneState(DataType),
        ...everyoneCreate(DataType),
    },
    {
        tableName : plural(allName),
        timestamps : false,
    });
    Event.associate = (modelsList) => {
        Event.belongsTo(modelsList.Category, {
            foreignKey : 'fk_category',
            as : 'category',
        });
        Event.belongsToMany(modelsList.Order, {
            foreignKey : 'fk_order',
            as : 'order',
            through : modelsList.Item,
        });
    };
	return Event;
};