'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'employee_apps',
      [
        {
          id: 1,
          appId: 1,
          employeeId: 1,
        },
        {
          id: 2,
          appId: 2,
          employeeId: 1,
        },
        {
          id: 3,
          appId: 3,
          employeeId: 1,
        },
        {
          id: 4,
          appId: 4,
          employeeId: 1,
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
