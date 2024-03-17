import express from "express";
import {
  loginUser,
  registerUser,
  fetchUser,
  fetchUsers,
  fetchUserById,
} from "../controllers/userControllers.js";
import { verifyUserToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/getAll", fetchUsers);
router.get("/", fetchUser);
router.get("/:id", fetchUserById);

export default router;
