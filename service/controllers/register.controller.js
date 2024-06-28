const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/auth");

const register = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already registered",
      });
    }

    const hashedPass = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPass });
    res.status(201).send({
      success: true,
      user,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login req.body ==>", req.body);
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Username or password invalid!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Username or password invalid!",
      });
    }
    console.log("process.env.JWT_SECRET_KEY", process.env.JWT_SECRET_KEY);
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    const userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(200).send({
      success: true,
      idToken: token,
      user: userDetails,
      message: "User logged in successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login failed",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      res.status(500).send({
        success: false,
        message: "Password is required!",
      });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User not found!",
      });
      return;
    }

    const hashPass = await hashPassword(password);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashPass },
      { new: true }
    );
    res.status(200).send({
      success: true,
      updatedUser,
      message: "User Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(200).send({
      succes: false,
      message: "Get All users API failed!",
      error,
    });
  }
};
module.exports = { register, login, updateUser, getUsers };
