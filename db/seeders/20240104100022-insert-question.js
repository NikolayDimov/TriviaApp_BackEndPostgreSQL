'use strict';
const { tableEmpty } = require('../helpers');
const { questions } = require('../data');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const isTableEmpty = await tableEmpty('Question', queryInterface, t);

      if (isTableEmpty) {
        return queryInterface.bulkInsert('Question', questions, { transaction: t });
      }

      return true;
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Question", null, {});
  }
};