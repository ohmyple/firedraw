'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('drawings', {
      photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photoid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false
      },
      gameid: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false
      },
      userid: {
        type: Sequelize.UUID,
        foreignKey: true,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('drawings')
  }
};
