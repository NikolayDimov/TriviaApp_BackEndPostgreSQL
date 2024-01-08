const express = require("express");
const categoryService = require("../services/category");

const router = express.Router();

router.get("/category", categoryService.findAll);

module.exports = router;
