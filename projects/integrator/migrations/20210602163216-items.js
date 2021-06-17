'use strict';
const {
  plural,
} = require('../utils');
const {
  everyoneCreate,
  everyoneState,
  id,
} = require('../utils/sequelize');
const allName = 'item';
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return queryInterface.createTable(plural(allName), {
      ...id(Sequelize),
      fk_order : {
        allowNull : false,
        type : Sequelize.INTEGER,
      },
      fk_event : {
        allowNull : false,
        type : Sequelize.INTEGER,
      },
      fk_product : {
        allowNull : false,
        type : Sequelize.INTEGER,
      },
      fk_service : {
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