import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
    {
        src_Url: {
            type: String,
            required: "Src URL is required"
        },
        thumbnail_Url: {
            type: String,
            required: "Thumbnail URL is required"
        },
        hovernail_Url: String,
        title: {
            type: String,
            required: "Title is required"
        },
        description: String,
        views: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    }
);

const model = mongoose.model("Video", VideoSchema);

export default model;