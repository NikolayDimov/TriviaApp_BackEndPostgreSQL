const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    omitNull: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

const db = {
    sequelize: sequelize,
    Difficulty: require("../models/difficulty")(sequelize),
    Category: require("../models/category")(sequelize),
    Question: require("../models/question")(sequelize),
};


// For creating Foreign key - but not need, because Postres create foreign key
// db.Difficulty.hasMany(db.Question, { as: "diffucultyId", sourceKey: "id" });
// db.Category.hasMany(db.Question, { as: "categoryId", sourceKey: "id" });

module.exports = { db };
