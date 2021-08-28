"use strict";

require("regenerator-runtime");

require("dotenv/config");

var _app = _interopRequireDefault(require("./app"));

require("../build/db");

require("./models/Video");

require("./models/User");

require("./models/Comment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.api = functions.https.onRequest(_app["default"]);