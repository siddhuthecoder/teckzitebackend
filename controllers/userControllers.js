import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, sub } = req.body;

  try {
    const user = await User.findOne({ email });
    const checkSub = await bcrypt.compare(sub, user.sub);
    if (!checkSub) {
      return res.status(404).json({ message: "Invalid Attempt to login" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(200).json({ message: "No User Found", user: null });
  }
};

export const registerUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    college,
    phno,
    year,
    collegeId,
    gender,
    img,
    state,
    district,
    idUpload,
    city,
    referredBy,
  } = req.body;

  const sub = await bcrypt.hash(email.slice[(0, 4)], 12);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      email,
      firstName,
      lastName,
      college,
      phno,
      year,
      collegeId,
      gender,
      img,
      state,
      district,
      idUpload,
      sub,
      city,
      referredBy,
    });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

export const fetchUser = async (req, res) => {
  const userId = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
