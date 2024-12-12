const queries = require("../db/queries");

async function indexRouterGet(req, res, next) {
  try {
    const messages = await queries.getMessages();
    // format the timestamp
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    // removes commas between date and time
    messages.forEach((message) => {
      const date = new Date(message.timestamp);
      message.formattedTimestamp = formatter.format(date).replace(/, /g, " ");
      console.log(message);
    });
    
    if (req.isAuthenticated()) {
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
