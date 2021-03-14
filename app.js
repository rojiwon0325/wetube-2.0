import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
const app = express();

app.set("view engine", "pug");
app.set("views", "./views/pages");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/", globalRouter);

export default app;