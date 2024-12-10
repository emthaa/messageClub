require("dotenv").config();
const queries = require("../db/queries");
function enterSecretRouterGet(req, res) {
  if (req.isAuthenticated()) {
    res.render("enter-secret", { message: null });
  } else {
    res.redirect("/");
  }
}

async function enterSecretRouterPost(req, res) {
  const { secretCode } = req.body;
  if (secretCode == process.env.SECRET_CODE) {
    queries.upgradeMembership(req.user.id);
    res.render("enter-secret", {
      message: "Secret code accepted! Your membership has been upgraded.",
    });
  } else {
    res.render("enter-secret", { message: "Incorrect secret code." });
  }
}

module.exports = {
  enterSecretRouterGet,
  enterSecretRouterPost,
};
