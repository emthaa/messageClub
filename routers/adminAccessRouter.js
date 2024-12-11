const { Router } = require("express");
const adminAccessRouter = Router();
const adminAccessController = require("../controllers/adminAccessController");

adminAccessRouter.get("/admin-access", adminAccessController.adminAccessRouterGet);
adminAccessRouter.post("/admin-access", adminAccessController.adminAccessRouterPost);

module.exports = adminAccessRouter;
