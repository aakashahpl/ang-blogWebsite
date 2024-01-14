import mongoose from "mongoose";

let isConnected :boolean = false;

const connectToDB = async() => {
    if (!process.env.MONGODB_DATABASE_URL) {
        console.log("MONGODB_DATABASE_URL not found in .env file");
        return;
    }
    if(isConnected){
        return console.log("already connected to the database");
        
    }
    try {

        await mongoose.connect(process.env.MONGODB_DATABASE_URL);
        console.log("successfully connected to the database");
        isConnected = true;

    } catch (error: any) {
        console.log(`error while connecting to the database ${error.message}`);
    }
};

export default connectToDB;
