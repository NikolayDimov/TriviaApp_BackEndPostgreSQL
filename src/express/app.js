const express = require("express");
const { db } = require("./db"); // Import the database connection
const categoryRoutes = require("./controllers/category");
const difficultyRoutes = require("./controllers/difficulty");
const questionRoutes = require("./controllers/question");



const app = express();

// Set CORS headers
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the sample application." });
});

// ROUTES
app.use(categoryRoutes);
app.use(difficultyRoutes);
app.use(questionRoutes);



// PORT
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});
