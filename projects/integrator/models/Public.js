const {
    capitalize,
    plural,
} = require('../utils');
const {
    everyoneAddress,
    everyoneContact,
    everyoneCreate,
    everyonePicture,
    everyoneProfile,
    everyoneState,
    id,
    publicAccess,
    publicAdd,
    publicCompany,
    publicCurriculum,
    publicDocument,
    publicLevel,
} = require('../utils/sequelize');
const allName = 'public';
module.exports = (sequelize, DataType) => {
	const Public = sequelize.define(capitalize(allName), {
        ...id(DataType),
        ...everyoneProfile(DataType),
        ...everyonePicture(DataType),
        ...publicAdd(DataType),
        ...publicDocument(DataType),
        ...everyoneAddress(DataType),
        ...everyoneContact(DataType),
        ...publicCurriculum(DataType),
        ...publicCompany(DataType),
        ...publicAccess(DataType),
        ...publicLevel(DataType),
        ...everyoneState(DataType),
        ...everyoneCreate(DataType),
    },
    {
        tableName : plural(allName),
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