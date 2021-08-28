"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", "".concat(process.cwd(), "/src/views/pages"));
app.use((0, _helmet["default"])({
  contentSecurityPolicy: false,
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin"
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: "same-origin"
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 3600 * 24
  },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.MONGO_URL
  })
}));
app.use("/", _globalRouter["default"]);
var _default = app;
exports["default"] = _default;