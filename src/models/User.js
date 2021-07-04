import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: "email is required",
            unique: true
        },
        name: {
            type: String,
            required: "nickname is required",
        },
        avatar: {
            type: String,
            required: "avatar is required",
        },
        google_picture: {
            type: String,
            required: "picture is required",
        },
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ]
    }
);


const model = mongoose.model("User", schema);

export default model;