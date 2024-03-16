import express from "express";
import {
  deleteWorkshop,
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
router.delete("/delete/:id", deleteWorkshop);

export default router;
