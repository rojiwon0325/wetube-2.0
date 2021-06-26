import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title is required"
        },
        description: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const model = mongoose.model("Video", schema);

export default model;