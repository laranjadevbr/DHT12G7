'use strict';
const {
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
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return queryInterface.createTable(plural(allName), {
      ...id(Sequelize),
      ...everyoneProfile(Sequelize),
      ...everyonePicture(Sequelize),
      ...publicAdd(Sequelize),
      ...publicDocument(Sequelize),
      ...everyoneAddress(Sequelize),
      ...everyoneContact(Sequelize),
      ...publicCurriculum(Sequelize),
      ...publicCompany(Sequelize),
      ...publicAccess(Sequelize),
      ...publicLevel(Sequelize),
      ...everyoneState(Sequelize),
      ...everyoneCreate(Sequelize),
    });
  },
  down : async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(plural(allName));
  },
};