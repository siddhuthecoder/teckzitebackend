import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const vPass = await bcrypt.compare(password, user.password);
    if (!vPass) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminRegister = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await Admin.create({
      username,
      role,
      password: hashedPassword,
    });

    return res.status(200).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
