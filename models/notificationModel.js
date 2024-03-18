import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  info: String,
  picturePath: {
    type: String,
  },
  link: {
    type: String,
    validate: {
      validator: function (value) {
        return value.startsWith("http");
      },
      message: (props) => `${props.value} is not a valid URL for link`,
    },
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
