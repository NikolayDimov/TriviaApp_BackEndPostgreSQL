"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Question', {
            id: {
                type: Sequelize.UUIDV4,
                defaultValue: Sequelize.fn('gen_random_uuid'),
                primaryKey: true,
            },
        
            difficultyId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Difficulty",
                        schema: "public",
                    },
                    key: "id",
                },
            },
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: {
                        tableName: "Category",
                        schema: "public",
                    },
                    key: "id",
                },
            },
            question: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            correctAnswer: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            incorrectAnswers: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false,
            },
            created: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("Question");
    },
};
