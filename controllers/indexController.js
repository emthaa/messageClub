const queries = require("../db/queries");

async function indexRouterGet(req, res) {
  try {
    const messages = await queries.getMessages();
    if (req.isAuthenticated()) {
      res.render("index", {
        username: req.user.username,
        messages: messages,
        membership: req.user.membership_status,
      });
    } else {
      res.render("index", {
        username: null,
        messages: messages,
        membership: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexRouterGet,
};
