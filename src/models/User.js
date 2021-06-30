import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: "email is required",
            unique: true
        },
        username: String,
        password: {
            type: String,
            required: "password is required"
        }
        // 해당 사이트 고유 계정이 없기 때문에 사용하지 않지만
        // npm bcrypt -> hasing이라는 개념을 이용해 입력받은 패스워드를
        // 여러차례 다른 문자열로 치환하여 저장한다
    }
);

schema.pre("save", () => {
    if (this.username) {
        // eslint-disable-next-line prefer-destructuring
        this.username = this.email.split("@")[0];
    }
});

const model = mongoose.model("User", schema);

export default model;