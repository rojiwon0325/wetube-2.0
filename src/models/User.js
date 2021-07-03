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
        picture: {
            type: String,
            required: "picture is required",
        }
    }
);

schema.pre("save", () => {

});

const model = mongoose.model("User", schema);

export default model;