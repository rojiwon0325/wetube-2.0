import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.set("view engine", "pug");
app.set("views", `${process.cwd()}/src/views/pages`);



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 3600 * 24
        },
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);

app.use("/", globalRouter);

export default app;