import { google } from "googleapis";
import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";
import { matchFromAbsolutePathsAsync } from "tsconfig-paths";

export const localMiddleware = (req, res, next) => {
    const { login, logout } = req.body;
    if (login) {
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URL,
        );
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "openid",]
        });
        req.session.referer = req.originalUrl;
        res.redirect(url);
    } else if (logout) {
        req.session.user = null;
        res.redirect(req.originalUrl);
    } else {
        res.locals.login = Boolean(req.session.user);
        if (Boolean(req.session.referer) && res.locals.login != true) {
            req.session.destroy((err) => {
                console.log(err);
            });
        } else if (res.locals.login) {
            res.locals.avatar = req.session.user.avatar;
        }
        next();
    }
};

export const privateMiddleware = (req, res, next) => {
    if (res.locals.login) {
        next();
    } else {
        res.status(403).redirect(req.headers.referer || "/");
    }
};
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `uploads/${file.fieldname}s`);
    }
});

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
});
const storage = multerS3({
    s3: s3,
    bucket: 'wetube-rojiwon',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
        cb(null, `uploads/${Date.now()}_${file.originalname}`)
    },
});

export const multerMW = multer({
    storage: storage
});

