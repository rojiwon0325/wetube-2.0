import { google } from "googleapis";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

export const cors = (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': 'https://wetube-rojiwon.s3.amazonaws.com/',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE',
        'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    console.log(res.headers());
    next();
};

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

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET
    }
});

export const multerMW = multer({
    storage: multerS3({
        s3,
        bucket: 'wetube-rojiwon',
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            const dest = file.fieldname;
            cb(null, `${dest}s/${Date.now()}_${file.originalname}`)
        },
    })
});
