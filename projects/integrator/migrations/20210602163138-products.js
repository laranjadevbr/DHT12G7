'use strict';
const {
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
      ...everyoneState(Sequelize),
      ...everyoneCreate(Sequelize),
    });
  },
  down : async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(plural(allName));
  },
};