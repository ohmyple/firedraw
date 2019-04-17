'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usergame', {
      userid: {
        type: Sequelize.STRING,
        foreignKey: true,
        allowNull: false
      },
      gameid: {
        type: Sequelize.STRING,
        foreignKey: true,
        allowNull: false
      },
      chatid: {
        type: Sequelize.STRING,
        foreignKey: true,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usergame')
  }
};
