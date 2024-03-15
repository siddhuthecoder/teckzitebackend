import express from "express";
import {
  createEvent,
  fetchAllEvents,
  fetchEventById,
  editEvent,
  deleteEvent,
} from "../controllers/eventControllers.js";

const router = express.Router();

router.post("/new", createEvent);
router.get("/all-events", fetchAllEvents);
router.get("/event/:id", fetchEventById);
router.put("/edit-event/:id", editEvent);
router.put("/delete-event/:id", deleteEvent);

export default router;
