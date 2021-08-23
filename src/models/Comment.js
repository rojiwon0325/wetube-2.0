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
        video: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Video"
        },
        root: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    }
);

schema.pre("save", async function () {
    if (!Boolean(this.root)) {
        this.root = this;
    }
});

const model = mongoose.model("Comment", schema);

export default model;