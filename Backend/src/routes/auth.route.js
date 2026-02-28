const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/*
@route /api/auth/register
@desc Register a new user
@access Public
*/
router.post("/register", authController.registerController);


/*
@route /api/auth/login
@desc Login a user
@access Public
*/
router.post("/login", authController.loginController);

module.exports = router;
