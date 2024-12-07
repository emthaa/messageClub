require("dotenv").config();
const pool = require("../db/pool");
function enterSecretRouterGet(req, res) {
  if (req.isAuthenticated()) {
    res.render("enter-secret", { message: null });
  } else {
    console.log(req.user)
    res.redirect("/");
  }
}

async function enterSecretRouterPost(req, res) {
  const { secretCode } = req.body;
  if (secretCode == process.env.SECRET_CODE) {
    await pool.query(
      `UPDATE users SET membership_status = $1 WHERE id = $2`,
      ['premium', req.user.id]
    );
    res.render("enter-secret", { message: "Secret code accepted! Your membership has been upgraded." });
  } else {
    res.render("enter-secret", { message: "Incorrect secret code." });
  }
}

module.exports = {
  enterSecretRouterGet,
  enterSecretRouterPost,
};
