import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import globalRouter from "./routers/globalRouter";
import { localMiddleware } from "./middlewares";

const app = express();

dotenv.config();
app.use(helmet());
app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views/pages`);



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);


app.use(localMiddleware);

app.use("/", globalRouter);

export default app;