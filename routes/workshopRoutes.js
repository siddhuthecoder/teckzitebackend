import express from "express";
import {
  editWorkshop,
  fetchAllWorkshops,
  fetchWorkshopById,
  newWorkshopUpload,
} from "../controllers/workshopControllers.js";

const router = express.Router();
router.post("/new", newWorkshopUpload);
router.get("/all-workshops", fetchAllWorkshops);
router.get("/:id", fetchWorkshopById);
router.put("/edit-workshop/:id", editWorkshop);

export default router;
