import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, sub } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(sub, user.sub);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Attempt to login" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
    branch,
    collegeId,
    gender,
    img,
    state,
    district,
    idUpload,
    city,
    referredBy,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const sub = await bcrypt.hash(email, 12);
    const user = await User.create({
      email,
      firstName,
      lastName,
      college,
      phno,
      year,
      branch,
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
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ tzkid: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
