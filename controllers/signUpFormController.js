const bcrypt = require("bcryptjs");
const pool = require("../db/pool");
const { check, validationResult } = require("express-validator");

function signUpFormRouterGet(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/");
    }else{
      res.render("sign-up-form", { errors: null, data: null });
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function signUpFormRouterPost(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
        data: req.body,
      });
    }

    const { firstName, lastName, username, password } = req.body;
    const fullName = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert info from form to db, default membership:standard
    const result = await pool.query(
      "INSERT INTO users (full_name, username, password, membership_status) VALUES ($1, $2, $3, $4) RETURNING id",
      [fullName, username, hashedPassword, "standard"]
    );
    // check if user went into db
    if (result.rowCount === 0) {
      throw new Error("Failed to insert user");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error during sign-up:", error);
    next(error);
  }
}

module.exports = {
  signUpFormRouterGet,
  signUpFormRouterPost,
};
