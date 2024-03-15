import express from "express";
import {
  deleteNotification,
  editNotification,
  fetchNotification,
  fetchNotificationById,
  newNotification,
} from "../controllers/notificationControllers.js";

const notificationRouter = express.Router();

notificationRouter.get("/", fetchNotification);
notificationRouter.get("/:id", fetchNotificationById);
notificationRouter.post("/new", newNotification);
notificationRouter.put("/update/:id", editNotification);
notificationRouter.delete("/delete/:id", deleteNotification);

export default notificationRouter;
