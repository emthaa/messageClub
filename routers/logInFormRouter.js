const { Router } = require("express");
const logInFormRouter = Router();
const logInFormController = require("../controllers/logInFormController");

logInFormRouter.get("/log-in", logInFormController.logInFormRouterGet);
logInFormRouter.post("/log-in", logInFormController.logInFormRouterPost);

module.exports = logInFormRouter;
