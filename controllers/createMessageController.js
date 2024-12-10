const queries = require("../db/queries");
const { check, validationResult } = require("express-validator");
function createMessageRouterGet(req, res) {
  try {
    if (req.isAuthenticated()) {
      res.render("create-message", { message: null, errors: null, data: null });
    } else {
      res.render("create-message", {
        message: "You must be logged in to create a message.",
        errors: null,
        data: null,
      });
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
        message: null,
        errors: errors.array(),
        data: req.body,
      });
    }

    if (req.isAuthenticated()) {
      const { title, message } = req.body;
      await queries.createMessage(title, message, req.user.id);
      res.redirect("/");
    } else {
      res.render("create-message", {
        message: "You must be logged in to create a message.",
        errors: [],
        data: req.body,
      });
    }
  } catch (error) {
    console.error("Error creating message:", error);
    next(error);
  }
}

module.exports = {
  createMessageRouterGet,
  createMessageRouterPost,
};
