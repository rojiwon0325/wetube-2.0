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
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const model = mongoose.model("Video", schema);

export default model;