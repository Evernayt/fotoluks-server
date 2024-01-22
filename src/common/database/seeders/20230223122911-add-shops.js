'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'shops',
      [
        {
          id: 1,
          name: 'Общий',
          description: '',
          address: '',
          abbreviation: 'Общий',
        },
        {
          id: 2,
          name: 'root',
          description: 'root',
          address: 'root',
          abbreviation: 'root',
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
