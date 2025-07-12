
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

// ✅ REGISTER CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password, address, role = "user" } = req.body;

  try {
    // 1. Basic field check
    if (!name || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Password format check
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be 8–16 characters, include one uppercase letter and one special character.",
      });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 4. Hash password & save user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, address, role });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN CONTROLLER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, role: user.role }); // ✅ Return role along with token
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
