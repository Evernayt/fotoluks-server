'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('order_products', 'price', {
      type: Sequelize.DECIMAL(11, 1),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('order_products', 'price', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
