import express from "express";
import {
  deleteNotification,
  editNotification,
  fetchNotification,
  fetchNotificationById,
  newNotification,
} from "../controllers/notificationControllers.js";

const router = express.Router();

router.get("/", fetchNotification);
router.get("/:id", fetchNotificationById);
router.post("/new", newNotification);
router.put("/update/:id", editNotification);
router.delete("/delete/:id", deleteNotification);

export default router;
