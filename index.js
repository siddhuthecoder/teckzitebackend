import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";

import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import workshopRoutes from "./routes/workshopRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

//middleware
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

app.use(cors());

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

/* DATABSE CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT} 🔥`);
      console.log("Database Connected Successfully ");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/user", userRoutes);
app.use("/events", eventRoutes);
app.use("/workshops", workshopRoutes);
app.use("/notifications", notificationRoutes);
app.use("/admin", adminRoutes);
