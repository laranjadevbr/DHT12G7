'use strict';
const {
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
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return queryInterface.createTable(plural(allName), {
      ...id(Sequelize),
      ...everyoneProfile(Sequelize),
      ...everyonePicture(Sequelize),
      ...everyoneState(Sequelize),
      ...everyoneCreate(Sequelize),
    });
  },
  down : async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(plural(allName));
  },
};