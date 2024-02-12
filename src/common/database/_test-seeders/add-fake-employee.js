'use strict';
const EMPLOYEES = require('../../fake-data/employees.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', EMPLOYEES, {});
  },

  async down(queryInterface, Sequelize) {
    //await queryInterface.bulkDelete('employees', null, {});
  },
};
