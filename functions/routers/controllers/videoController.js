"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postEditVideo = exports.getEditVideo = exports.postUpload = exports.getUpload = exports.videos = void 0;

var _Video = _interopRequireDefault(require("../../models/Video"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videos = function videos(req, res) {
  res.send("videos");
};

exports.videos = videos;

var getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload Video |"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, title, description, _req$files, file_video, file_thumbnail, newvideo, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, title = _req$body.title, description = _req$body.description;
            _req$files = req.files, file_video = _req$files.video, file_thumbnail = _req$files.thumbnail;
            _context.next = 5;
            return _Video["default"].create({
              title: title,
              thumbnail: file_thumbnail[0].path,
              source: file_video[0].path,
              meta: {
                description: description || "",
                createdAt: Date.now(),
                creator: req.session.user._id
              }
            });

          case 5:
            newvideo = _context.sent;
            _context.next = 8;
            return _User["default"].findById(req.session.user._id);

          case 8:
            user = _context.sent;
            user.videos.push(newvideo._id);
            _context.next = 12;
            return user.save();

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.redirect("/video/upload"));

          case 18:
            return _context.abrupt("return", res.redirect("/video"));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function postUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var getEditVideo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var reg, id, video;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reg = /([0-9a-f]{24})/g;
            id = req.params.id.match(reg);

            if (!(req.params.id == id)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 5;
            return _Video["default"].findById(id);

          case 5:
            video = _context2.sent;

            if (!video) {
              _context2.next = 12;
              break;
            }

            if (!(video.creator == req.session.user._id)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.render("editVideo", {
              pageTitle: "Edit Video |",
              video: video
            }));

          case 11:
            return _context2.abrupt("return", res.status(403).redirect("/watch?v=".concat(id)));

          case 12:
            _context2.next = 16;
            break;

          case 14:
            if (!id) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", res.redirect("/video/".concat(id, "/edit")));

          case 16:
            return _context2.abrupt("return", res.status(404).redirect("/"));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getEditVideo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, _req$body2, title, description, video;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context3.next = 4;
            return _Video["default"].findById(id);

          case 4:
            video = _context3.sent;

            if (!video) {
              _context3.next = 13;
              break;
            }

            if (!(video.creator != req.session.user._id)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(403).redirect("/watch?v=".concat(id)));

          case 8:
            if (!req.body["delete"]) {
              _context3.next = 11;
              break;
            }

            _context3.next = 11;
            return _Video["default"].findByIdAndDelete(id);

          case 11:
            _context3.next = 13;
            return _Video["default"].findByIdAndUpdate(id, {
              title: title,
              description: description
            });

          case 13:
            return _context3.abrupt("return", res.status(404).redirect("/video"));

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postEditVideo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;