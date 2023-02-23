'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'statuses',
      [
        {
          name: 'Новый',
          color: '#F7685B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'В работе',
          color: '#109CF1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Готов',
          color: '#9b58b5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Отдан',
          color: '#249641',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Отменен',
          color: '#929594',
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
