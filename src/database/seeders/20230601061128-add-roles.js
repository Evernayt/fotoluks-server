'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: 1,
          name: 'Админ',
          accessLevel: 1,
        },
        {
          id: 2,
          name: 'Менеджер',
          accessLevel: 2,
        },
        {
          id: 3,
          name: 'Сотрудник',
          accessLevel: 3,
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
