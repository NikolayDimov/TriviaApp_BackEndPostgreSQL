const express = require("express");
const { db } = require("./db"); // Import the database connection

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the sample application." });
});

// ROUTES
// Fetch All Difficulties
const difficultController = require("./conrollers/difficult-controller");
app.get("/difficult", difficultController.findAll);

// Fetch All Categories
const categoryController = require("./conrollers/category-controller");
app.get("/category", categoryController.findAll);

// Fetch All Questions
const questionControllerAll = require("./conrollers/question-controller");
app.get("/question", questionControllerAll.findAll);

// Fetch All Questions By Categories and Difficulty - not shuffle
const questionControllerByCategoryAndDifficulty = require("./conrollers/question-controller");
app.get("/questionCategory", questionControllerByCategoryAndDifficulty.findAllByCategoryAndDifficulty);

// Fetch All Questions By Categories and Difficulty - random by Math.random
const findAllByAnswersMath = require("./conrollers/question-controller");
app.get("/questionAnswersRandom", findAllByAnswersMath.findAllByAnswersMath);

// Fetch All Questions By Categories and Difficulty - shuffle question and answers with lodash 
const findAllQuestionByAnswers = require("./conrollers/question-controller");
app.get("/questionAnswers", findAllQuestionByAnswers.findAllByAnswers);

// Fetch All Questions By Categories and Difficulty - shuffle question with order: db.sequelize.random(), and answers with lodash
const findAllBySequelizeRandom = require("./conrollers/question-controller");
app.get("/questionSequilzeRandom", findAllBySequelizeRandom.findAllBySequelizeRandom);


// PORT
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
