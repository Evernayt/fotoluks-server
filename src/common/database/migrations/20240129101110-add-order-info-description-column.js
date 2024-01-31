'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('order_infos', 'description', {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('order_infos', 'description');
  },
};
