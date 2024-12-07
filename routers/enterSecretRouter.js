const { Router } = require("express");
const enterSecretRouter = Router();
const enterSecretController = require("../controllers/enterSecretController");

enterSecretRouter.get("/enter-secret", enterSecretController.enterSecretRouterGet);
enterSecretRouter.post("/enter-secret", enterSecretController.enterSecretRouterPost);

module.exports = enterSecretRouter;
