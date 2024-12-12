const { Router } = require("express");
const logInFormRouter = Router();
const logInFormController = require("../controllers/logInFormController");
const { check, validationResult } = require("express-validator");
logInFormRouter.get("/log-in", logInFormController.logInFormRouterGet);
logInFormRouter.post("/log-in", [
    check("username")
        .trim(),
    check("password")
        .trim(),
],logInFormController.logInFormRouterPost);

module.exports = logInFormRouter;
