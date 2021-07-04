import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title is required",
            trim: true
        },
        description: {
            type: String,
            default: "",
            trim: true
        },
        source: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    }
);

const model = mongoose.model("Video", schema);

export default model;