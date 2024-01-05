const { db } = require("../db");
const { validateData } = require("../schema/questions");
const { validate } = require("uuid");

/**
 * Retrieve all difficulty from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findAll = async (req, res) => {
    try {
      const question = await db.Question.findAll();
  
      return res.status(200).json({ result: question.map((item) => item.get({ plain: true })), errors: [] });
    } catch (error) {
      return res.status(500).json({ result: null, errors: [error.message] });
    }
  };


  exports.findAllByCategoryAndDifficulty = async (req,res) => {
    const{categoryId, difficultyId} = req.query;

    try{ 
      const question = await db.Question.findAll({
        where: { categoryId, difficultyId },
        attributes: ['id', 'question', 'categoryId', 'difficultyId', 'correctAnswer', 'incorrectAnswers']
      });
      res.status(200).json({ result: question.map((item) => item.get({ plain: true })), errors: [] })
    } catch (error) {
      return res.status(500).json({ result: null, errors: [error.message] });
    }
  };



//--------------------------------

  // Fetch All Questions By Categories and Difficulty - Sort and Math.random()
  exports.findAllAnswersByMathRandom = async (req, res) => {
    const { categoryId, difficultyId } = req.query;

    try {
      // Simple Validate category and difficulty
      // if (!categoryId || !difficultyId) {
      //   return res.status(400).json({ result: null, errors: ['Category and difficulty are required.'] });
      // }

      if(!validate(categoryId) || !validate(difficultyId)) {
        return res.status(400).json({ result: null, errors: ['Not validate'] });
      }
     
      // Validate category and difficulty from db
      const validateDifficulty = await db.Difficulty.findByPk(difficultyId);
      const validateCategory = await db.Category.findByPk(categoryId);
     
       if (!validateDifficulty || !validateCategory) {
        return res.status(400).json({ result: null, errors: ['Category and difficulty are not correct.'] });
      }
  
      // Fetch questions based on category and difficulty
      const questions = await db.Question.findAll({
        where: { categoryId, difficultyId },
        attributes: ['id', 'question', 'categoryId', 'difficultyId', 'correctAnswer', 'incorrectAnswers'],
      });
  
      // Questions shuffle
      const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  
      // Answers in each question shuffle
      const questionsWithRandomAnswers = shuffledQuestions.map(question => {
        const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
        const randomizedAnswers = allAnswers.sort(() => Math.random() - 0.5);
  
        return {
          ...question.get({ plain: true }),
          answers: randomizedAnswers,
        };
      });
  
      res.status(200).json({ result: questionsWithRandomAnswers, errors: [] });
    } catch (error) {
      return res.status(500).json({ result: null, errors: [error.message] });
    }
  };







//------------------------------

  const lodash = require('lodash');

  // Fetch All Questions By Categories and Difficulty - shuffle question and answers with lodash 
  exports.findAllAnswersByLodash = async (req, res) => {
    const { categoryId, difficultyId } = req.query;
  
    try {
      // Validate category and difficulty
      if (!categoryId || !difficultyId) {
        return res.status(400).json({ result: null, errors: ['Category and difficulty are required.'] });
      }

      // Validate category and difficulty from db
      const validateDifficulty = await db.Difficulty.findByPk(difficultyId);
      const validateCategory = await db.Category.findByPk(categoryId);
     
       if (!validateDifficulty || !validateCategory) {
        return res.status(400).json({ result: null, errors: ['Category and difficulty are not correct.'] });
      }
  
      // Fetch questions based on category and difficulty
      const questions = await db.Question.findAll({
        where: { categoryId, difficultyId },
        attributes: ['id', 'question', 'categoryId', 'difficultyId', 'correctAnswer', 'incorrectAnswers'],
      });
  
      // Randomize the order of questions
      const shuffledQuestions = lodash.shuffle(questions);
      // const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  
      // Randomize the order of answers in each question
      const questionsWithRandomAnswers = shuffledQuestions.map(question => {
        const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
        const randomizedAnswers = lodash.shuffle(allAnswers);
        //const randomizedAnswers = allAnswers.sort(() => Math.random() - 0.5);
  
        return {
          ...question.get({ plain: true }),
          answers: randomizedAnswers,
        };
      });
  
      res.status(200).json({ result: questionsWithRandomAnswers, errors: [] });
    } catch (error) {
      return res.status(500).json({ result: null, errors: [error.message] });
    }
  };
  


// Fetch All Questions By Categories and Difficulty - shuffle question with order: db.sequelize.random(), and answers with lodash
exports.findAllAnswersBySequelize = async (req, res) => {
  const { categoryId, difficultyId } = req.query;

  try {
    // Validate category and difficulty
    if (!categoryId || !difficultyId) {
      return res.status(400).json({ result: null, errors: ['Category and difficulty are required.'] });
    }

     // Validate category and difficulty from db
     const validateDifficulty = await db.Difficulty.findByPk(difficultyId);
     const validateCategory = await db.Category.findByPk(categoryId);
    
      if (!validateDifficulty || !validateCategory) {
       return res.status(400).json({ result: null, errors: ['Category and difficulty are not correct.'] });
     }

    // Fetch questions based on category and difficulty with random order
    const questions = await db.Question.findAll({
      where: { categoryId, difficultyId },
      attributes: ['id', 'question', 'categoryId', 'difficultyId', 'correctAnswer', 'incorrectAnswers'],
      order: db.sequelize.random(),
    });

    // Randomize the order of answers in each question
    const questionsWithRandomAnswers = questions.map(question => {
      const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
      const randomizedAnswers = lodash.shuffle(allAnswers);

      return {
        ...question.get({ plain: true }),
        answers: randomizedAnswers,
      };
    });

    res.status(200).json({ result: questionsWithRandomAnswers, errors: [] });
  } catch (error) {
    return res.status(500).json({ result: null, errors: [error.message] });
  }
};

