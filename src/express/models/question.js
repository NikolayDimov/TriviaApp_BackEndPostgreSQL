// models/question.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Question = sequelize.define(
        "Question",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            difficultyId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            question: DataTypes.STRING,
            correctAnswer: DataTypes.STRING,
            incorrectAnswers: DataTypes.ARRAY(DataTypes.STRING),
            created: DataTypes.DATE,
            updated: DataTypes.DATE,
        },
        {
            tableName: "Question",
            createdAt: "created",
            updatedAt: "updated",
            deletedAt: "deleted",
            paranoid: true,
            freezeTableName: true,
            timestamps: true,
        }
    );

    // Define associations
    // Question.belongsTo(sequelize.models.Difficulty, { foreignKey: "difficulty", as: "questionDifficulty" });
    // Question.belongsTo(sequelize.models.Category, { foreignKey: "category", as: "questionCategory" });

    return Question;
};
