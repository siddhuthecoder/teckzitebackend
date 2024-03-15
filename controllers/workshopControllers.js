import Workshop from "../models/workshopModel.js";

export const newWorkshopUpload = async (req, res) => {
  try {
    const {
      name,
      dep,
      about,
      workshopImg,
      structure,
      contact,
      instructirName,
      instructorSpecifications,
      instructorImage,
    } = req.body;

    const newWorkshop = new Workshop({
      name,
      dep,
      about,
      workshopImg,
      structure,
      contact,
      instructirName,
      instructorSpecifications,
      instructorImage,
    });

    const savedWorkshop = await newWorkshop.save();
    res.status(201).json(savedWorkshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllWorkshops = async (req, res) => {
  try {
    const allWorkshops = await Workshop.find();

    if (!allWorkshops || allWorkshops.length === 0) {
      return res.status(404).json({ message: "No workshops found" });
    }

    res.status(200).json(allWorkshops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const workshop = await Workshop.findById(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      dep,
      about,
      workshopImg,
      structure,
      contact,
      instructirName,
      instructorSpecifications,
      instructorImage,
    } = req.body;

    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      id,
      {
        name,
        dep,
        about,
        workshopImg,
        structure,
        contact,
        instructirName,
        instructorSpecifications,
        instructorImage,
      },
      { new: true }
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(updatedWorkshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
