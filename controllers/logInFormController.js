const passport = require("passport");

function logInFormRouterGet(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      res.render("log-in-form", { errors: null, data: null });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

function logInFormRouterPost(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    console.log(user);
    if (err) return next(err);
    if (!user) return res.redirect("/log-in");

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
}
module.exports = {
  logInFormRouterGet,
  logInFormRouterPost,
};