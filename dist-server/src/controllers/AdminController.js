"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _expressValidator = require("express-validator");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _admin = _interopRequireDefault(require("../Models/admin.js"));

var _adminToken = _interopRequireDefault(require("../Models/adminToken.js"));

var _randomCharacterGenerator = _interopRequireDefault(require("../lib/randomCharacterGenerator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import admin from '../Models/admin.js';
_dotenv["default"].config();

var emailPassword = process.env.EMAIL_PASSWORD;
var emailSender = process.env.EMAIL_SENDER;
var resetPasswordUrl = process.env.RESET_PASSWORD_URL;
var emailHost = process.env.EMAIL_HOST;

var AdminController = /*#__PURE__*/function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, email, password, isAdmin, error, salt, hashedPassword, admin, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password, isAdmin = _req$body.isAdmin;
                error = (0, _expressValidator.validationResult)(req);

                if (error.isEmpty()) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(422).json({
                  errors: error.array()
                }));

              case 5:
                _context.next = 7;
                return _bcryptjs["default"].genSalt(10);

              case 7:
                salt = _context.sent;
                _context.next = 10;
                return _bcryptjs["default"].hash(password, salt);

              case 10:
                hashedPassword = _context.sent;
                _context.next = 13;
                return _admin["default"].create({
                  email: email,
                  password: hashedPassword,
                  isAdmin: isAdmin
                });

              case 13:
                admin = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  _id: admin._id,
                  isAdmin: admin.isAdmin
                }, process.env.SECRET, {
                  expiresIn: '1d'
                });
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'You have signed up successfully',
                  token: token
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: _context.t0.message
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var errors, _req$body2, email, password, admin, isValidPassword, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                // check for validation errors
                errors = (0, _expressValidator.validationResult)(req);

                if (errors.isEmpty()) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 4:
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Search for unique Admin

                _context2.next = 7;
                return _admin["default"].findOne({
                  email: email
                });

              case 7:
                admin = _context2.sent;

                if (admin) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: 'Invalid Login info'
                }));

              case 10:
                _context2.next = 12;
                return _bcryptjs["default"].compare(password, admin.password);

              case 12:
                isValidPassword = _context2.sent;

                if (isValidPassword) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: 'Invalid login password'
                }));

              case 15:
                // sign admin token
                token = _jsonwebtoken["default"].sign({
                  _id: admin._id,
                  isAdmin: admin.isAdmin
                }, process.env.SECRET, {
                  expiresIn: '1d'
                });
                return _context2.abrupt("return", res.status(200).json({
                  message: 'Admin login successful',
                  token: token
                }));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  message: 'Internal Server error',
                  error: _context2.t0
                }));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 19]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var admin;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                console.log('searching...');
                _context3.next = 4;
                return _admin["default"].find();

              case 4:
                admin = _context3.sent;

                if (admin.length) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "No Administrators available yet...please sign up"
                }));

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Here's a list of Administrators",
                  data: admin
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  status: 500,
                  message: _context3.t0.message
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      function get(_x5, _x6) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, admin;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return _admin["default"].findById(id);

              case 4:
                admin = _context4.sent;

                if (!admin) {
                  _context4.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: "Here's your search",
                  data: admin
                });
                _context4.next = 10;
                break;

              case 9:
                throw new Error('User with this ID was not found');

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                res.status(500).json({
                  message: _context4.t0.message
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function getById(_x7, _x8) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var adminId, admin;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                adminId = req.params.id;
                _context5.next = 4;
                return _admin["default"].findByIdAndDelete(adminId, req.body);

              case 4:
                admin = _context5.sent;

                if (!admin) {
                  _context5.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: "User deleted"
                });
                _context5.next = 10;
                break;

              case 9:
                throw new Error('Admin with this ID was not found');

              case 10:
                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                res.status(500).json({
                  message: _context5.t0.message
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var error, adminId, admin;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                // check for errors from validator
                error = (0, _expressValidator.validationResult)(req);

                if (error.isEmpty()) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", res.status(422).json({
                  errors: error.array()
                }));

              case 4:
                adminId = req.params.id;
                _context6.next = 7;
                return _admin["default"].findByIdAndUpdate(adminId, req.body);

              case 7:
                admin = _context6.sent;

                if (!admin) {
                  _context6.next = 12;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: 'Update successful'
                });
                _context6.next = 13;
                break;

              case 12:
                throw new Error('Admin with this ID does not exist');

              case 13:
                _context6.next = 18;
                break;

              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](0);
                res.status(500).json(_context6.t0.message);

              case 18:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 15]]);
      }));

      function update(_x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "requestPasswordReset",
    value: function () {
      var _requestPasswordReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var error, email, admin, token, text, subject, transporter, mailOptions;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                error = (0, _expressValidator.validationResult)(req);

                if (error.isEmpty()) {
                  _context7.next = 4;
                  break;
                }

                return _context7.abrupt("return", res.status(422).json({
                  errors: error.array()
                }));

              case 4:
                email = req.body.email; // Find unique user

                _context7.next = 7;
                return _admin["default"].findOne({
                  email: email
                });

              case 7:
                admin = _context7.sent;

                if (admin) {
                  _context7.next = 10;
                  break;
                }

                return _context7.abrupt("return", res.status(400).json({
                  message: 'This admin does not exist..please try again later.'
                }));

              case 10:
                _context7.next = 12;
                return _adminToken["default"].findOne({
                  adminId: admin._id
                });

              case 12:
                token = _context7.sent;

                if (token) {
                  _context7.next = 17;
                  break;
                }

                _context7.next = 16;
                return new _adminToken["default"]({
                  userId: admin._id,
                  token: (0, _randomCharacterGenerator["default"])(6)
                }).save();

              case 16:
                token = _context7.sent;

              case 17:
                // Send email
                text = "To reset your password,\n      please click the link below.\n\n".concat(resetPasswordUrl, "/password-reset/").concat(admin._id, "/").concat(token.token);
                subject = 'Forgot Password'; // send email notification

                transporter = _nodemailer["default"].createTransport({
                  host: emailHost,
                  port: 465,
                  secure: true,
                  auth: {
                    user: emailSender,
                    pass: emailPassword
                  },
                  tls: {
                    secureProtocol: 'TLSv1_method'
                  }
                });
                mailOptions = {
                  from: "".concat(emailSender),
                  to: email,
                  subject: subject,
                  text: text,
                  replyTo: emailSender
                };
                transporter.sendMail(mailOptions);
                return _context7.abrupt("return", res.status(200).json('Password reset link sent to your email account'));

              case 25:
                _context7.prev = 25;
                _context7.t0 = _context7["catch"](0);
                return _context7.abrupt("return", res.status(500).json({
                  status: 500,
                  message: _context7.t0.message
                }));

              case 28:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 25]]);
      }));

      function requestPasswordReset(_x13, _x14) {
        return _requestPasswordReset.apply(this, arguments);
      }

      return requestPasswordReset;
    }()
  }, {
    key: "passwordReset",
    value: function () {
      var _passwordReset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var error, password, admin, token;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                error = (0, _expressValidator.validationResult)(req);

                if (error.isEmpty()) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt("return", res.status(422).json({
                  errors: error.array()
                }));

              case 4:
                password = req.body.password;
                _context8.next = 7;
                return _admin["default"].findById(req.params.id);

              case 7:
                admin = _context8.sent;

                if (admin) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'invalid link or expired'
                }));

              case 10:
                _context8.next = 12;
                return _adminToken["default"].findOne({
                  adminId: admin._id,
                  token: req.params.token
                });

              case 12:
                token = _context8.sent;

                if (token) {
                  _context8.next = 15;
                  break;
                }

                return _context8.abrupt("return", res.status(400).json({
                  status: 400,
                  message: 'invalid link or expired'
                }));

              case 15:
                user.password = password;
                _context8.next = 18;
                return admin.save();

              case 18:
                _context8.next = 20;
                return token["delete"]();

              case 20:
                return _context8.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Password reset sucessfully. Please login with your new password'
                }));

              case 23:
                _context8.prev = 23;
                _context8.t0 = _context8["catch"](0);
                return _context8.abrupt("return", res.status(500).json({
                  status: 500,
                  message: _context8.t0.errors.map(function (err) {
                    return err.message.replace(/"/g, '');
                  })
                }));

              case 26:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 23]]);
      }));

      function passwordReset(_x15, _x16) {
        return _passwordReset.apply(this, arguments);
      }

      return passwordReset;
    }()
  }]);

  return AdminController;
}();

var _default = AdminController;
exports["default"] = _default;