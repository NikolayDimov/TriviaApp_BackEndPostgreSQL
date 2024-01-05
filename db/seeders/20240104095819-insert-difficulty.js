'use strict';
const { tableEmpty } = require('../helpers');
const { difficulty } = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('Difficulty', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('Difficulty', difficulty, { transaction: t });
      }

      return true;
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Difficulty", null, {});
  }
};
