import dotenv from "dotenv";
import "./db";
import "./models/Video"
import "./models/Comment"
import app from "./app";

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`✅ Listening on: http://localhost:${PORT}`);
});
