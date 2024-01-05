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
const difficultController = require("./conrollers/difficult-controller");
app.get("/difficult", difficultController.findAll);

const categoryController = require("./conrollers/category-controller");
app.get("/category", categoryController.findAll);

const questionController = require("./conrollers/question-controller");
app.get("/question", questionController.findAll);


// PORT
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
