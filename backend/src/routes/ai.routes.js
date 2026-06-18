const express = require("express");
const aiController = require("../controllers/ai.controller");
const aiRouter = express.Router();

aiRouter.post("/generate-report", aiController.generateReportController);

module.exports = aiRouter;
