import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: "Title is required",
            trim: true
        },
        thumbnail: {
            type: String,
            required: "Thumbnail is required"
        },
        source: {
            type: String,
            required: true
        },
        meta: {
            views: { type: Number, default: 0, required: true },
            description: { type: String, default: "", trim: true },
            createdAt: { type: Date, default: Date.now },
            creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        }
    }
);

const model = mongoose.model("Video", schema);

export default model;