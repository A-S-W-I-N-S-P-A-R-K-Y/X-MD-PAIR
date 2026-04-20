import mongoose from "mongoose";
import config from "../config.js";

export default function connectDatabase() {
    mongoose.connect(config.MONGODB_URI);
    const database = mongoose.connection;
    database.on('error', (err) => {
        console.log('Database connection error: ', err);
    });
    database.once('open', () => {
        console.log('Mongo DB connected!');
    });
}