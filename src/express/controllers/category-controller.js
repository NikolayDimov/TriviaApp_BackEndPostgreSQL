const express = require("express");
const categoryService = require("../services/category-service");

const router = express.Router();

router.get("/category", categoryService.findAll);

module.exports = router;
