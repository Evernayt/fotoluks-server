'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'statuses',
      [
        {
          name: 'Новый',
          color: 'red',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'В работе',
          color: 'blue',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Готов',
          color: 'purple',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Отдан',
          color: 'green',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Отменен',
          color: 'gray',
          createdAt: new Date(),
          updatedAt: new Date(),
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
