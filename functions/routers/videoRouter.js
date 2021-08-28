"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("./controllers/videoController");

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.get("/", _videoController.videos); // my video list

videoRouter.route("/upload").get(_videoController.getUpload).post(_middlewares.multerMW.fields([{
  name: "video"
}, {
  name: "thumbnail"
}]), _videoController.postUpload);
videoRouter.route("/:id/edit").get(_videoController.getEditVideo).post(_videoController.postEditVideo);
var _default = videoRouter;
exports["default"] = _default;