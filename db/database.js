import mongoose from "mongoose";
import { Dbname } from "../constant.js";

const connectDb=async() =>{
    try {
        // console.log(process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${Dbname}`);
        console.log(`You have successsfully connected to the database , HOST:-${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }

}

export default connectDb;


