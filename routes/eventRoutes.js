import express from "express";
import {
  createEvent,
  fetchAllEvents,
  fetchEventById,
  editEvent,
  deleteEvent,
  eventRegistration,
} from "../controllers/eventControllers.js";
import { verifyUserToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", createEvent);
router.get("/all-events", fetchAllEvents);
router.get("/:id", fetchEventById);
router.put("/edit-event/:id", editEvent);
router.delete("/delete-event/:id", deleteEvent);

router.post("/register/:id", verifyUserToken, eventRegistration);

export default router;
