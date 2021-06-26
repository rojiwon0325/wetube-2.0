import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: String,
        account: String,
        videos: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    }
);

const model = mongoose.model("User", schema);

export default model;