const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redis = require("../config/cache");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    return res.status(401).json({
      msg: "User with this credentials is alredy exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JET_SECREAT,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "User registered Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      msg: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      msg: "Invalid Credentaisl",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JET_SECREAT,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "User loggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;
  // console.log(userId);

  const user = await userModel.findById({ _id: userId });

  if (!user) {
    return res.status(401).json({
      msg: "User is not authorized",
    });
  }

  res.status(200).json({
    msg: "User fetched Successfully",
    user,
  });
}

async function logOutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(200).json({
    message: "logout successfully.",
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logOutController,
};
