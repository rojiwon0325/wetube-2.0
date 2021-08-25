import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: "Text is required"
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        root: {
            type: mongoose.Schema.Types.ObjectId,
            required: "on is required",
            refPath: "onModel",
        },
        rootModel: {
            type: String,
            required: true,
            enum: ["Video", "Comment"]
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    }
);

const model = mongoose.model("Comment", schema);

export default model;