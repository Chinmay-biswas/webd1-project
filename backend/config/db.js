import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname');
      console.log(`MongoDB connected : ${con.connection.host}`);
    } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);// here 1 means failure and 0 means success
  }
};
