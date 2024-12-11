require("dotenv").config();
const queries = require("../db/queries");
function adminAccessRouterGet(req, res) {
  if (req.isAuthenticated()) {
    res.render("admin-access", { message: null });
  } else {
    res.redirect("/");
  }
}

async function adminAccessRouterPost(req, res) {
  const { adminCode } = req.body;
  if (adminCode == process.env.ADMIN_CODE) {
    queries.grantAdminAccess(req.user.id);
    res.render("admin-access", {
      message: "Admin code accepted! You have been granted admin access.",
    });
  } else {
    res.render("admin-access", { message: "Incorrect secret code." });
  }
}

module.exports = {
  adminAccessRouterGet,
  adminAccessRouterPost,
};
