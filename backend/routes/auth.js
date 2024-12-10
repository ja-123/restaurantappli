import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();
const JWT_SECRET = "a1b2c3d4e5f6g7h8i9j0"; 

// Register User
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.status(201).json({ token, user: { name, email } });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Login User
router.post(
  "/login",
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, user: { name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Validate Token (Protected Route)
router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

export default router;
