import mongoose from "mongoose";
import app from "./app.js";

const PORT = 5000;

mongoose
  .connect("mongodb://localhost:27017/AI_Asistance_Project")
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });