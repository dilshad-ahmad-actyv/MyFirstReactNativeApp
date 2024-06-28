const express = require("express");
const {
  register,
  login,
  updateUser,
  getUsers,
} = require("../controllers/register.controller");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.put("/update-user", updateUser);
router.get("/users", getUsers);
module.exports = router;
