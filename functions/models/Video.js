"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: "Title is required",
    trim: true
  },
  thumbnail: {
    type: String,
    required: "Thumbnail is required"
  },
  source: {
    type: String,
    required: true
  },
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    description: {
      type: String,
      "default": "",
      trim: true
    },
    createdAt: {
      type: Date,
      "default": Date.now
    },
    creator: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    comments: [{
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Comment"
    }]
  }
});

var model = _mongoose["default"].model("Video", schema);

var _default = model;
exports["default"] = _default;