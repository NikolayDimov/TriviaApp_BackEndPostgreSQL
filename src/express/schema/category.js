const { body, param } = require('express-validator');

const createCategorySchema = [
  body('name').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim(),
];
const updatCategorySchema = [
  param('id').notEmpty({ ignore_whitespace: true }).isUUID(4),
  body('name').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 }),
];

module.exports = { createCategorySchema, updatCategorySchema };