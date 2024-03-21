import express from "express";
import {
  loginUser,
  registerUser,
  fetchUser,
  fetchUsers,
  fetchUserById,
  createOrder,
  paymentVerification,
  getTopReferrals,
} from "../controllers/userControllers.js";
import { verifyUserToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getAll", fetchUsers);
router.get("/", verifyUserToken, fetchUser);
router.get("/:id", fetchUserById);

router.post("/order/create", createOrder);
router.post("/order/verify", paymentVerification);

router.get("/refs/top", getTopReferrals);

export default router;
