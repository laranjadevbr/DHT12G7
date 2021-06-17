'use strict';
// class Foo extends Model {
//   get fullName() {
//     return this.firstName + ' ' + this.lastName;
//   }
//   set fullName(value) {
//     const name = value.split(' ');
//     this.setDataValue('firstName', name.slice(0, -1).join(' '));
//     this.setDataValue('lastName', name.slice(-1).join(' '));
//   }
// }
module.exports = {
  up : async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('publics', {
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER,
      },
      // 
      firstName : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      lastName : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      gender : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      email : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      password : {
        allowNull : false,
        type : Sequelize.STRING,
      },
      // 
      approved : {
        allowNull : false,
        defaultValue : false,
        type : Sequelize.BOOLEAN,
      },
      deleted : {
        allowNull : false,
        defaultValue : false,
        type : Sequelize.BOOLEAN,
      },
      disable : {
        allowNull : false,
        defaultValue : false,
        type : Sequelize.BOOLEAN,
      },
      // 
      createdAt : {
        allowNull : false,
        defaultValue : Sequelize.NOW,
        type : Sequelize.DATE,
      },
      updatedAt : {
        allowNull : false,
        defaultValue : Sequelize.NOW,
        type : Sequelize.DATE,
      },
    });
  },
  down : async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('publics');
  },
};