import express from "express";
import {
  loginUser,
  registerUser,
  fetchUser,
  fetchUsers,
} from "../controllers/userControllers.js";
import { verifyUserToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getAll", fetchUsers);
router.get("/", verifyUserToken, fetchUser);

export default router;
