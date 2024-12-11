const queries = require("../db/queries");

async function indexRouterGet(req, res) {
  try {
    const messages = await queries.getMessages();
    if (req.isAuthenticated()) {
      console.log(req.user);
      res.render("index", {
        username: req.user.username,
        messages: messages,
        membership: req.user.membership_status,
        admin: req.user.admin,
      });
    } else {
      res.render("index", {
        username: null,
        messages: messages,
        membership: null,
        admin: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexRouterGet,
};
