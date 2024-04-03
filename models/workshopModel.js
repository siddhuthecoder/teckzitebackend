import mongoose from "mongoose";

const regStudentsSchema = new mongoose.Schema({
  email: { type: String },
  name: String,
  phno: String,
  idNumber: String,
  college: String,
});

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
  entryFee: String,
  instructorName: String,
  instructorSpecifications: String,
  instructorImage: String,
  regStudents: { type: [regStudentsSchema], default: [] },
});

const Workshop = mongoose.model("Workshop", workshopSchema);
export default Workshop;
