const { Router } = require("express");
const signUpFormRouter = Router();
const signUpFormController = require("../controllers/signUpFormController");
const { check, validationResult } = require("express-validator");
const pool = require("../db/pool");
signUpFormRouter.get("/sign-up", signUpFormController.signUpFormRouterGet);

signUpFormRouter.post(
  "/sign-up",
  [
    check("firstName")
      .trim()
      .isLength({ min: 2, max: 30 })
      .withMessage("First name must be between 2 and 30 characters"),
    check("lastName")
      .trim()
      .isLength({ min: 2, max: 30 })
      .withMessage("Last name must be between 2 and 30 characters"),
    check("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters")
      .matches(/^\w+$/)
      .withMessage(
        "Username must contain only letters, numbers, or underscores"
      )
      .custom(async (value) => {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [value]
        );
        if (rows.length) {
          throw new Error("Username is already taken");
        }
      }),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
    check("confirmPassword")
      .trim()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  signUpFormController.signUpFormRouterPost
);

module.exports = signUpFormRouter;
