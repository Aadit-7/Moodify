const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
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

/*
@route /api/auth/get-me
@desc Get the details of logged in user
@access Private
*/
router.get("/get-me", authMiddleware.authUser, authController.getMeController);

/*

*/
router.get("/logout", authController.logOutController);
module.exports = router;
