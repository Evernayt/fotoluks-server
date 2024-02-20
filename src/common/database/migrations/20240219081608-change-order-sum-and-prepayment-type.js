'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.changeColumn('orders', 'sum', {
        type: Sequelize.DECIMAL(11, 1),
        allowNull: false,
      }),
      await queryInterface.changeColumn('orders', 'prepayment', {
        type: Sequelize.DECIMAL(11, 1),
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      await queryInterface.changeColumn('orders', 'sum', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      await queryInterface.changeColumn('orders', 'prepayment', {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]);
  },
};
