'use strict';
const { tableEmpty } = require('../helpers');
const { categories } = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('Category', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('Category', categories, { transaction: t });
      }

      return true;
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Category", null, {});
  }
};