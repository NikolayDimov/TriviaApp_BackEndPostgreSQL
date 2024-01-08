const express = require("express");
const questionService = require("../services/question");

const router = express.Router();

// Fetch All Questions
router.get("/question", questionService.findAll);

// Fetch All Questions By Categories and Difficulty - not shuffle
router.get("/questionCategory", questionService.findAllByCategoryAndDifficulty);

// Fetch All Questions By Categories and Difficulty - shuffle question by Math.random
router.get("/questionAnswersM", questionService.findAllAnswersByMathRandom);

// Fetch All Questions By Categories and Difficulty - shuffle question and answers with lodash
router.get("/questionAnswersL", questionService.findAllAnswersByLodash);

// Fetch All Questions By Categories and Difficulty - shuffle question with order: db.sequelize.random(), and answers with lodash
router.get("/questionAnswersS", questionService.findAllAnswersBySequelize);

module.exports = router;
