"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

var db = _mongoose["default"].connection;
db.once("open", function () {
  console.log("✅ Connected to DB");
});
db.on("error", function (error) {
  console.log("\u274C Error on DB Connection:".concat(error));
});