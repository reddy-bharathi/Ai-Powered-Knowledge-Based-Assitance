import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/AI_Asistance_Project"
    );

    console.log("MongoDB Connected Successfully");
    console.log("Host:", connection.connection.host);
    console.log("Database:", connection.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;