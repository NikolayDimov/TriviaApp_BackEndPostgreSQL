const { db } = require("./src/express/db");
// const questionsData = require("./seeders/question_geography_easy.json");
// const questionsData = require("./seeders/question_history_easy.json");
// const questionsData = require("./seeders/question_geography_medium.json");
const questionsData = require("./seeders/question_history_medium.json");

const importData = async () => {
    try {
        await db.sequelize.sync(); // Ensure database is synced
        await db.Question.bulkCreate(questionsData.results);
        console.log("Data imported successfully.");
    } catch (error) {
        console.error("Error importing data:", error.message);
    } finally {
        await db.sequelize.close(); // Close the Sequelize connection
    }
};

importData();
