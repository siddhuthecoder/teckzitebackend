import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dep: String,
  about: String,
  workshopImg: String,
  structure: String,
  contact: String,
  instructorName: String,
  instructorSpecifications: String,
  instructorImage: String,
});

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
