const {
    capitalize,
    plural,
} = require('../utils');
const {
    everyoneCreate,
    everyoneState,
    id,
} = require('../utils/sequelize');
const allName = 'order';
module.exports = (sequelize, DataType) => {
	const Order = sequelize.define(capitalize(allName), {
        ...id(DataType),
        fk_public : {
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
    Order.associate = (modelsList) => {
        // Order.belongsTo(modelsList.Public, {
        //     foreignKey : 'fk_public',
        //     as : 'public',
        // });
        // Order.belongsToMany(modelsList.Event, {
        //     foreignKey : 'fk_event',
        //     as : 'event',
        //     through : modelsList.Item,
        // });
        Order.belongsToMany(modelsList.Product, {
            foreignKey : 'fk_product',
            as : 'product',
            through : modelsList.Item,
        });
        // Order.belongsToMany(modelsList.Service, {
        //     foreignKey : 'fk_service',
        //     as : 'service',
        //     through : modelsList.Item,
        // });
    };
    return Order;
};