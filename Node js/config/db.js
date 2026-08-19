import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/class");
        console.log("mongodb connected successfully");
    } catch (error) {
        console.error(error);
    }
};

export default connectDb;