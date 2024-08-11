"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false;
const connectToDB = async () => {
    if (!process.env.MONGODB_DATABASE_URL) {
        console.log("MONGODB_DATABASE_URL not found in .env file");
        return;
    }
    if (isConnected) {
        return console.log("already connected to the database");
    }
    try {
        await mongoose_1.default.connect(process.env.MONGODB_DATABASE_URL);
        console.log("successfully connected to the database");
        isConnected = true;
    }
    catch (error) {
        console.log(`error while connecting to the database ${error.message}`);
    }
};
exports.default = connectToDB;
//# sourceMappingURL=db.js.map