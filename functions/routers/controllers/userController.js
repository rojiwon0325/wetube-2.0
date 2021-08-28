"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditProfile = exports.profile = exports.me = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var me = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.redirect("/user/".concat(req.session.user._id));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function me(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.me = me;

var profile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var reg, id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reg = /([0-9a-f]{24})/g;
            id = req.params.id.match(reg);

            if (!(req.params.id == id)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 5;
            return _User["default"].findById(id).populate({
              path: "videos",
              model: "Video",
              populate: {
                path: "creator",
                model: "User"
              }
            });

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 9;
              break;
            }

            if (res.locals.login) {
              res.locals.me = req.session.user;
            }

            return _context2.abrupt("return", res.render("userProfile", {
              pageTitle: user ? "".concat(user.name, " |") : "",
              user: user
            }));

          case 9:
            _context2.next = 13;
            break;

          case 11:
            if (!id) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.redirect("/user/".concat(id)));

          case 13:
            return _context2.abrupt("return", res.status(404).redirect("/"));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function profile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.profile = profile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, name, check, file, image, newname;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, check = _req$body.check;
            file = req.file;
            image = req.session.user.avatar;
            newname = req.session.user.name;

            if (!check && file) {
              image = file.path;
            } else if (check) {
              image = req.session.user.google_picture;
            }

            if (name != "") {
              newname = name;
            }

            _context3.next = 8;
            return _User["default"].findByIdAndUpdate(req.session.user._id, {
              name: newname,
              avatar: image
            });

          case 8:
            req.session.user.avatar = image;
            req.session.user.name = newname;
            return _context3.abrupt("return", res.redirect("/user"));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postEditProfile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;