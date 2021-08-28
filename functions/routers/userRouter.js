"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("./controllers/userController");

var _middlewares = require("./middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/:id", _userController.profile);
userRouter.use(_middlewares.privateMiddleware);
userRouter.get("/", _userController.me);
userRouter.route("/edit").post(_middlewares.multerMW.single("avatar"), _userController.postEditProfile);
var _default = userRouter;
exports["default"] = _default;