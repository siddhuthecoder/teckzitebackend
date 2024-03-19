import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  info: String,
  picturePath: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
