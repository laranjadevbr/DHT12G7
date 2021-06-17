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
const allName = 'product';
module.exports = (sequelize, DataType) => {
	const Product = sequelize.define(capitalize(allName), {
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
    Product.associate = (modelsList) => {
        Product.belongsTo(modelsList.Category, {
            foreignKey : 'fk_category',
            as : 'category',
        });
        Product.belongsToMany(modelsList.Order, {
            foreignKey : 'fk_order',
            as : 'order',
            through : modelsList.Item,
        });
    };
	return Product;
};