"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  root: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: "on is required",
    refPath: "onModel"
  },
  rootModel: {
    type: String,
    required: true,
    "enum": ["Video", "Comment"]
  },
  replies: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var model = _mongoose["default"].model("Comment", schema);

var _default = model;
exports["default"] = _default;