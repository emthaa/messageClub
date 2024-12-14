const queries = require("../db/queries");
const { check, validationResult } = require("express-validator");

function createMessageRouterGet(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.render("create-message", { message: null, errors: null, data: null });
    } else {
      res.redirect("/log-in");
    }
  } catch (error) {
    next(error);
  }
}

async function createMessageRouterPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty() && req.isAuthenticated()) {
      return res.status(400).render("create-message", {
        errors: errors.array(),
        data: req.body,
      });
    }

    if (req.isAuthenticated()) {
      const { title, message } = req.body;
      await queries.createMessage(title, message, req.user.id);
      res.redirect("/");
    } else {
      res.redirect("/log-in");
    }
  } catch (error) {
    console.error("Error creating message:", error);
    next(error);
  }
}

async function deleteMessageRouterPost(req, res, next) {
  try {
    if (req.isAuthenticated() && req.user.admin) {
      const messageId = req.params.id;
      await queries.deleteMessage(messageId);
      res.redirect("/");
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    next(error);
  }
}

module.exports = {
  createMessageRouterGet,
  createMessageRouterPost,
  deleteMessageRouterPost,
};