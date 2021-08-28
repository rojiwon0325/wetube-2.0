"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComment = exports.comment = exports.view = exports.watch = exports.results = exports.googleLoginCallback = exports.home = void 0;

var _googleapis = require("googleapis");

var _Video = _interopRequireDefault(require("../../models/Video"));

var _User = _interopRequireDefault(require("../../models/User"));

var _Comment = _interopRequireDefault(require("../../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos, _videos;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).sort({
              createdAt: "desc"
            }).populate("creator");

          case 3:
            videos = _context.sent;
            return _context.abrupt("return", res.render("home", {
              videos: videos
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            _videos = [];
            return _context.abrupt("return", res.render("home", {
              videos: _videos
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var googleLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var code, oauth2Client, oauth, _yield$oauth2Client$g, tokens;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            code = req.query.code;
            oauth2Client = new _googleapis.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
            oauth = _googleapis.google.oauth2({
              auth: oauth2Client,
              version: "v2"
            });
            _context3.next = 5;
            return oauth2Client.getToken(code);

          case 5:
            _yield$oauth2Client$g = _context3.sent;
            tokens = _yield$oauth2Client$g.tokens;
            oauth2Client.setCredentials(tokens);
            oauth.userinfo.get( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, _res) {
                var url;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!_res) {
                          _context2.next = 16;
                          break;
                        }

                        _context2.next = 3;
                        return _User["default"].findOne({
                          email: _res.data.email
                        });

                      case 3:
                        req.session.user = _context2.sent;

                        if (req.session.user) {
                          _context2.next = 10;
                          break;
                        }

                        _context2.next = 7;
                        return _User["default"].create({
                          email: _res.data.email,
                          name: _res.data.name,
                          avatar: _res.data.picture,
                          google_picture: _res.data.picture,
                          videos: []
                        });

                      case 7:
                        req.session.user = _context2.sent;
                        _context2.next = 12;
                        break;

                      case 10:
                        _context2.next = 12;
                        return _User["default"].findByIdAndUpdate(req.session.user._id, {
                          google_picture: _res.data.picture
                        });

                      case 12:
                        req.session.user.videos = null;
                        res.redirect(req.session.referer);
                        _context2.next = 17;
                        break;

                      case 16:
                        if (err) {
                          url = oauth2Client.generateAuthUrl({
                            access_type: "offline",
                            scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"]
                          });
                          res.redirect(url);
                        }

                      case 17:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5, _x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function googleLoginCallback(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.googleLoginCallback = googleLoginCallback;

var results = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var search_query, videos;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            search_query = req.query.search_query.trim().replace(/ +/g, " ");
            videos = [];

            if (!search_query) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return _Video["default"].find({
              title: {
                $regex: new RegExp("\\b".concat(search_query.split(" ").join("|"), "\\b"), "ig")
              }
            }).sort({
              createdAt: "desc"
            }).populate("creator");

          case 5:
            videos = _context4.sent;

          case 6:
            res.locals.search_query = search_query;
            return _context4.abrupt("return", res.render("search", {
              pageTitle: "".concat(search_query, " |"),
              videos: videos
            }));

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function results(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.results = results;

var watch = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var reg, id, video, now;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            reg = /([0-9a-f]{24})/g;
            id = req.query.v.match(reg);

            if (!(req.query.v == id)) {
              _context5.next = 11;
              break;
            }

            _context5.next = 5;
            return _Video["default"].findById(id).populate({
              path: "meta.creator",
              model: "User"
            }).populate({
              path: "meta.comments",
              model: "Comment",
              populate: "creator"
            });

          case 5:
            video = _context5.sent;

            if (!video) {
              _context5.next = 9;
              break;
            }

            now = new Date();
            return _context5.abrupt("return", res.render("watch", {
              pageTitle: video ? "".concat(video.title, " |") : "",
              video: video,
              now: now,
              comments: video.meta.comments
            }));

          case 9:
            _context5.next = 13;
            break;

          case 11:
            if (!id) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("return", res.redirect("/watch?v=".concat(id)));

          case 13:
            return _context5.abrupt("return", res.render("404"));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function watch(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.watch = watch;

var view = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var reg, id, video;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            reg = /([0-9a-f]{24})/g;
            id = req.query.v.match(reg);

            if (!(req.query.v == id)) {
              _context6.next = 11;
              break;
            }

            _context6.next = 5;
            return _Video["default"].findById(id);

          case 5:
            video = _context6.sent;

            if (!video) {
              _context6.next = 11;
              break;
            }

            video.meta.views += 1;
            _context6.next = 10;
            return video.save();

          case 10:
            return _context6.abrupt("return", res.status(200));

          case 11:
            return _context6.abrupt("return", res.status(404));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function view(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.view = view;

var comment = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body, text, root, rootModel, v, cmt;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body = req.body, text = _req$body.text, root = _req$body.root, rootModel = _req$body.rootModel;
            v = null;
            _context7.next = 4;
            return _Comment["default"].create({
              text: text,
              creator: req.session.user._id,
              root: root,
              rootModel: rootModel,
              createdAt: Date.now()
            });

          case 4:
            cmt = _context7.sent;

            if (!(rootModel == "Video")) {
              _context7.next = 18;
              break;
            }

            _context7.next = 8;
            return _Video["default"].findById(root);

          case 8:
            v = _context7.sent;
            v.meta.comments.push(cmt);
            _context7.next = 12;
            return v.save();

          case 12:
            _context7.next = 14;
            return _Video["default"].findById(root).populate({
              path: "meta.comments",
              model: "Comment",
              populate: "creator"
            });

          case 14:
            v = _context7.sent;
            return _context7.abrupt("return", res.send({
              length: v.meta.comments.length,
              comment: cmt,
              creator: {
                _id: req.session.user._id,
                avatar: req.session.user.avatar,
                name: req.session.user.name
              }
            }));

          case 18:
            if (!(rootModel == "Comment")) {
              _context7.next = 28;
              break;
            }

            _context7.next = 21;
            return _Comment["default"].findById(root);

          case 21:
            v = _context7.sent;
            v.replies.push(cmt);
            _context7.next = 25;
            return v.save();

          case 25:
            return _context7.abrupt("return", res.send({
              comment: cmt,
              creator: {
                _id: req.session.user._id,
                avatar: req.session.user.avatar,
                name: req.session.user.name
              }
            }));

          case 28:
            return _context7.abrupt("return", res.send({
              error: "error"
            }));

          case 29:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function comment(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.comment = comment;

var getComment = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var _req$query, v, root, end, begin, comments, video, _comment;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$query = req.query, v = _req$query.v, root = _req$query.root, end = _req$query.end;
            begin = -1;
            comments = null;

            if (!(root == "Video")) {
              _context8.next = 21;
              break;
            }

            _context8.next = 6;
            return _Video["default"].findById(v).populate({
              path: "meta.comments",
              model: "Comment",
              populate: "creator"
            });

          case 6:
            video = _context8.sent;

            if (!(end == -1)) {
              _context8.next = 12;
              break;
            }

            begin = video.meta.comments.length - 30 > 0 ? video.meta.comments.length - 30 : 0;
            comments = video.meta.comments.slice(begin).reverse();
            _context8.next = 18;
            break;

          case 12:
            if (!(end > 0)) {
              _context8.next = 17;
              break;
            }

            begin = end > 30 ? end - 30 : 0;
            comments = video.meta.comments.slice(begin, end).reverse();
            _context8.next = 18;
            break;

          case 17:
            return _context8.abrupt("return", res.send({
              length: video.meta.comments.length,
              comments: [],
              begin: begin
            }));

          case 18:
            return _context8.abrupt("return", res.send({
              length: video.meta.comments.length,
              comments: comments,
              begin: begin
            }));

          case 21:
            if (!(root == "Comment")) {
              _context8.next = 37;
              break;
            }

            _context8.next = 24;
            return _Comment["default"].findById(v).populate({
              path: "replies",
              model: "Comment",
              populate: "creator"
            });

          case 24:
            _comment = _context8.sent;

            if (!(end == -1)) {
              _context8.next = 30;
              break;
            }

            begin = _comment.replies.length - 10 > 0 ? _comment.replies.length - 10 : 0;
            comments = _comment.replies.slice(begin).reverse();
            _context8.next = 36;
            break;

          case 30:
            if (!(end > 0)) {
              _context8.next = 35;
              break;
            }

            begin = end > 10 ? end - 10 : 0;
            comments = _comment.replies.slice(begin, end).reverse();
            _context8.next = 36;
            break;

          case 35:
            return _context8.abrupt("return", res.send({
              comments: [],
              begin: begin
            }));

          case 36:
            return _context8.abrupt("return", res.send({
              comments: comments,
              begin: begin
            }));

          case 37:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getComment(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getComment = getComment;