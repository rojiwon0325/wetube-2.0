"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: "email is required",
    unique: true
  },
  name: {
    type: String,
    required: "nickname is required"
  },
  avatar: {
    type: String,
    required: "avatar is required"
  },
  google_picture: {
    type: String,
    required: "picture is required"
  },
  videos: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var model = _mongoose["default"].model("User", schema);

var _default = model;
exports["default"] = _default;