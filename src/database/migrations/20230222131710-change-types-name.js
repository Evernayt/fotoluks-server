'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() =>
        queryInterface.sequelize.query('DROP INDEX `name` ON `types`;'),
      )
      .then(() =>
        queryInterface.changeColumn('types', 'name', {
          type: Sequelize.STRING,
          unique: false,
          allowNull: false,
        }),
      );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('types', 'name', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    });
  },
};
