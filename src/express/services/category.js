const { db } = require("../db");
const { validateData } = require("../schema/category");

/**
 * Retrieve all difficulty from the database
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.findAll = async (req, res) => {
    try {
      const category = await db.Category.findAll({ order: [['name', 'ASC']] });
  
      return res.status(200).json({ result: category.map((item) => item.get({ plain: true })), errors: [] });
    } catch (error) {
      return res.status(500).json({ result: null, errors: [error.message] });
    }
  };