import "regenerator-runtime";
import "dotenv/config";
import app from "./app";
import "./db";
import "./models/Video"
import "./models/User"
import "./models/Comment"

app.listen(process.env.PORT, () => {
    console.log(`✅ Listening on: http://localhost:${process.env.PORT}`);
});
