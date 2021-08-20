"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../Models/admin.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminController = /*#__PURE__*/function () {
  function AdminController() {//

    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var errors, _req$body, email, password, admin, isValidPassword, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                // check for validation errors
                errors = (0, _expressValidator.validationResult)(req);

                if (errors.isEmpty()) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 4:
                _req$body = req.body, email = _req$body.email, password = _req$body.password; // Search for unique Admin

                _context.next = 7;
                return _admin["default"].findOne({
                  email: email
                });

              case 7:
                admin = _context.sent;

                if (admin) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Invalid Login info'
                }));

              case 10:
                _context.next = 12;
                return _bcryptjs["default"].compare(password, admin.password);

              case 12:
                isValidPassword = _context.sent;

                if (isValidPassword) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Invalid login password'
                }));

              case 15:
                // sign admin token
                token = jwt.sign({
                  email: admin.email
                }, process.env.SECRET, {
                  expiresIn: '12h'
                });
                return _context.abrupt("return", res.status(200).json({
                  message: 'Admin login successful',
                  token: token
                }));

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  message: 'Internal Server error',
                  error: _context.t0
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return AdminController;
}();

var _default = AdminController;
exports["default"] = _default;