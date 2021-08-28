"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerMW = exports.privateMiddleware = exports.localMiddleware = void 0;

var _googleapis = require("googleapis");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localMiddleware = function localMiddleware(req, res, next) {
  var _req$body = req.body,
      login = _req$body.login,
      logout = _req$body.logout;

  if (login) {
    var oauth2Client = new _googleapis.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
    var url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"]
    });
    req.session.referer = req.originalUrl;
    res.redirect(url);
  } else if (logout) {
    req.session.user = null;
    res.redirect(req.originalUrl);
  } else {
    res.locals.login = Boolean(req.session.user);

    if (Boolean(req.session.referer) && res.locals.login != true) {
      req.session.destroy(function (err) {
        console.log(err);
      });
    } else if (res.locals.login) {
      res.locals.avatar = req.session.user.avatar;
    }

    next();
  }
};

exports.localMiddleware = localMiddleware;

var privateMiddleware = function privateMiddleware(req, res, next) {
  if (res.locals.login) {
    next();
  } else {
    res.status(403).redirect(req.headers.referer || "/");
  }
};

exports.privateMiddleware = privateMiddleware;

var multerStorage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "uploads/".concat(file.fieldname, "s"));
  }
});

var multerMW = (0, _multer["default"])({
  storage: multerStorage
});
exports.multerMW = multerMW;