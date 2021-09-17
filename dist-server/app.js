"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _admins = _interopRequireDefault(require("./routes/admins.js"));

var _db = _interopRequireDefault(require("../server/src/config/db.js"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();

_dotenv["default"].config();

app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Headers': "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"
  });
  next();
});
app.use((0, _cors["default"])());
app.options('*', (0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use('/', _index["default"]);
app.use('/users', _users["default"]);
app.use('/admins', _admins["default"]);
(0, _db["default"])();
app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var accessToken, _yield$jwt$verify, userId, exp;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!req.headers['x-access-token']) {
              _context.next = 15;
              break;
            }

            accessToken = req.headers['x-access-token'];
            _context.next = 4;
            return jwt.verify(accessToken, process.env.JWT_SECRET);

          case 4:
            _yield$jwt$verify = _context.sent;
            userId = _yield$jwt$verify.userId;
            exp = _yield$jwt$verify.exp;

            if (!(exp < Date.now().valueOf() / 1000)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'JWT token has expired, please login to obtain a new one'
            }));

          case 9:
            _context.next = 11;
            return User.findById(userId);

          case 11:
            res.locals.loggedInUser = _context.sent;
            next();
            _context.next = 16;
            break;

          case 15:
            next();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = app;
exports["default"] = _default;