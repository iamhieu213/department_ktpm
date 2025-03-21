const express = require("express");
const User = require("../config/models/users.models");

const router = express.Router();
router.post("/add", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log("2zzzz");
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;