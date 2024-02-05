import mongoose from "mongoose";
const mongoURI = "mongodb://127.0.0.1:27017/crud";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log(`Database is connected`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
    process.exit(1)
  }
};

export default connectDB;
