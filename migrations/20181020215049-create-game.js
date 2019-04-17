'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('game', {
        gameid: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: true,
          primaryKey: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true
        },
        chatid: {
          type:Sequelize.UUID,
          allowNull: true,
          foreignKey: true
        },
        gamename: {
          type:Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('game')
  }
};
