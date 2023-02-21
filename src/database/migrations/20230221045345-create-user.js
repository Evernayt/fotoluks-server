'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, unique: true, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      vk: { type: Sequelize.STRING, allowNull: false },
      telegram: { type: Sequelize.STRING, allowNull: false },
      avatar: { type: Sequelize.STRING },
      archive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
