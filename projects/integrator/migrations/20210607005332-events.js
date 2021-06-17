'use strict';
const {
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
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return queryInterface.createTable(plural(allName), {
      ...id(Sequelize),
      fk_category : {
        allowNull : false,
        type : Sequelize.INTEGER,
      },
      ...everyoneProfile(Sequelize),
      ...everyonePicture(Sequelize),
      ...everyoneCost(Sequelize),
      ...eventDate(Sequelize),
      ...everyoneAddress(Sequelize),
      ...everyoneContact(Sequelize),
      ...everyoneState(Sequelize),
      ...everyoneCreate(Sequelize),
    });
  },
  down : async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(plural(allName));
  },
};