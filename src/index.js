import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Video"
import "./models/User"
import "./models/Comment"

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`✅ Listening on: http://localhost:${PORT}`);
});
