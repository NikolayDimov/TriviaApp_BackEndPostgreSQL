const { body, param } = require('express-validator');

const createDifficultSchema = [
  body('name').notEmpty({ ignore_whitespace: true }).isString().isLength({ min: 10 }).trim(),
];
const updateDifficultSchema = [
  param('id').notEmpty({ ignore_whitespace: true }).isUUID(4),
  body('name').notEmpty({ ignore_whitespace: true }).isString().trim().isLength({ min: 10 }),
];

module.exports = { createDifficultSchema, updateDifficultSchema };