import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    if (user.password !== password) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { adminId: user._id },
      process.env.JWT_ADMIN_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminRegister = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await Admin.create({
      username,
      role,
      password,
    });

    return res.status(200).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
