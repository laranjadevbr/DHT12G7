'use strict';
const {
  plural,
} = require('../utils');
const {
  everyoneCreate,
  everyoneState,
  id,
} = require('../utils/sequelize');
const allName = 'order';
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return queryInterface.createTable(plural(allName), {
      ...id(Sequelize),
      fk_public : {
        allowNull : false,
        type : Sequelize.INTEGER,
      },
      ...everyoneState(Sequelize),
      ...everyoneCreate(Sequelize),
    });
  },
  down : async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(plural(allName));
  },
};