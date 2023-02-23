'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = await bcrypt.hash('toor', 5);
    await queryInterface.bulkInsert(
      'employees',
      [
        {
          name: 'root',
          login: 'root',
          password: hashPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    //await queryInterface.bulkDelete('employees', null, {});
  },
};
