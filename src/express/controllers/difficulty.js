const express = require("express");
const difficultyService = require("../services/difficulty");

const router = express.Router();

router.get("/difficulty", difficultyService.findAll);

module.exports = router;