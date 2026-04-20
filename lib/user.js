import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        sessionId: String,
        creds: mongoose.Schema.Types.Mixed
    }
);

export default mongoose.model('User', userSchema);