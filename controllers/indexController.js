function indexRouterGet(req, res) {
  try {
    if (req.isAuthenticated()) {
      console.log(req.user)
      res.render("index", { username: req.user.username });
    } else {
      res.render("index", { username : null});
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  indexRouterGet,
};
