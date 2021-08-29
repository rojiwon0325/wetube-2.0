import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";
import { cors } from "./routers/middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views/pages`);

app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: "same-origin"
}));
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 3600 * 24
        },
        store: MongoStore.create({ mongoUrl: process.env.DB_URL })
    })
);

app.use("/", globalRouter);

export default app;