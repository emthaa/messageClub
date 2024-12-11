const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const createMessageRouter = Router();
const createMessageController = require("../controllers/createMessageController");

createMessageRouter.get(
  "/create-message",
  createMessageController.createMessageRouterGet
);
createMessageRouter.post(
  "/create-message",
  [
    check("title")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("Title must be between 1 and 100 characters"),
    check("message")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Message must not be empty")
      .isLength({ max: 500 })
      .withMessage("Message too long"),
  ],
  createMessageController.createMessageRouterPost
);

createMessageRouter.post(
  "/delete-message/:id",
  createMessageController.deleteMessageRouterPost
);

module.exports = createMessageRouter;