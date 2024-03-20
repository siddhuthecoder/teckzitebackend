import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { instance } from "../index.js";
import crypto from "crypto";

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
    mode,
    referredBy,
    razorpay_order_id,
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
      razorpay_order_id,
      state,
      district,
      idUpload,
      sub,
      city,
      referredBy,
      mode,
    });

    if (!mode) {
      return res.status(400).json({ error: "Mode Error" });
    }
    if (mode !== "offline_mode") {
      if (!razorpay_order_id) {
        return res.status(400).json({ error: "Payment Check Error" });
      }
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

export const createOrder = async (req, res) => {
  const { email, amount } = req.body;
  const domainPattern = /@(rguktn|rgukto|rgukts|rguktr)\.ac\.in$/;

  let ramount = amount;
  if (domainPattern.test(email)) {
    ramount = Number(process.env.FEE_RGUKT);
  } else {
    ramount = Number(process.env.FEE_OUTSIDERS);
  }

  const order = await instance.orders.create({
    amount: Number(ramount * 100),
    currency: "INR",
  });

  if (!order.id) {
    res.status(200).send({ status: "Failure" });
  }
  res.status(200).send({ order, status: "success" });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, order_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
  hmac.update(order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  const isAuth = generated_signature === razorpay_signature;
  console.log(generated_signature);
  console.log(razorpay_signature);
  if (isAuth) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({
      message: "Payment Failed Due to Signature not matched",
      success: false,
    });
  }
};
