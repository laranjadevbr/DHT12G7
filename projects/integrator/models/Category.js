const {
    capitalize,
    plural,
} = require('../utils');
const {
    everyoneCreate,
    everyonePicture,
    everyoneProfile,
    everyoneState,
    id,
} = require('../utils/sequelize');
const allName = 'category';
module.exports = (sequelize, DataType) => {
	const Category = sequelize.define(capitalize(allName), {
        ...id(DataType),
        ...everyoneProfile(DataType),
        ...everyonePicture(DataType),
        ...everyoneState(DataType),
        ...everyoneCreate(DataType),
    },
    {
        tableName : plural(allName),
        timestamps : false,
    });
    Category.associate = (modelsList) => {
        Category.hasMany(modelsList.Product, {
            foreignKey : 'fk_category',
            as : 'product',
        });
        // Category.hasMany(modelsList.Event, {
        //     foreignKey : 'fk_category',
        //     as : 'event',
        // });
        // Category.hasMany(modelsList.Service, {
        //     foreignKey : 'fk_category',
        //     as : 'service',
        // });
    };
	return Category;
};