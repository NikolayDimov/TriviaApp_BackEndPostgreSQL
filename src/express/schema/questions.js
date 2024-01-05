const { body, param } = require("express-validator");

const createQuestionSchema = [
    body("difficulty").notEmpty({ ignore_whitespace: true }).isString(),
    body("category").notEmpty({ ignore_whitespace: true }).isString(),
    body("question").notEmpty({ ignore_whitespace: true }).isString(),
    body("correctAnswer").notEmpty({ ignore_whitespace: true }).isString(),
    body("incorrectAnswers").notEmpty({ ignore_whitespace: true }).isArray(),
];


module.exports = { createQuestionSchema };
