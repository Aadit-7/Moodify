const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cookieParser());

/* ROUTES */
const authRouter = require("./routes/auth.route.js");

app.use("/api/auth", authRouter);

module.exports = app;
