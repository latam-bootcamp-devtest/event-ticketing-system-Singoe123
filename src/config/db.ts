import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

const connectDB = async ()=> {
    try{
        await mongoose.connect(mongoURI!);
        console.log('DB connected!');
    }catch(error: any){
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;