'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'apps',
      [
        {
          id: 1,
          value: 'ORDERS',
          description: 'Заказы',
        },
        {
          id: 2,
          value: 'CONTROL_PANEL',
          description: 'Панель управления',
        },
        {
          id: 3,
          value: 'MOYSKLAD',
          description: 'МойСклад',
        },
        {
          id: 4,
          value: 'TASKS',
          description: 'Задачи',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
