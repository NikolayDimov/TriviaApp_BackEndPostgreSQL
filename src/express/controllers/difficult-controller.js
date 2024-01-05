const express = require("express");
const difficultyService = require("../services/difficult-service");

const router = express.Router();

router.get("/difficult", difficultyService.findAll);

module.exports = router;