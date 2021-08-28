"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _globalController = require("./controllers/globalController");

var _videoRouter = _interopRequireDefault(require("./videoRouter"));

var _userRouter = _interopRequireDefault(require("./userRouter"));

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.use("/uploads", _express["default"]["static"]("uploads"));
globalRouter.use("/static", _express["default"]["static"]("static"));
globalRouter.get("/google-auth/callback", _globalController.googleLoginCallback);
globalRouter.use(_middlewares.localMiddleware);
globalRouter.get("/", _globalController.home);
globalRouter.get("/results", _globalController.results);
globalRouter.get("/watch", _globalController.watch);
globalRouter.get("/comment", _globalController.getComment);
globalRouter.use("/user", _userRouter["default"]);
globalRouter.use(_middlewares.privateMiddleware);
globalRouter.use("/video", _videoRouter["default"]);
globalRouter.post("/comment", _globalController.comment);
globalRouter.post("/view", _globalController.view);
var _default = globalRouter;
exports["default"] = _default;