"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../Models/user.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var UserController = /*#__PURE__*/function () {
  function UserController() {//

    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, fullName, email, phone, sex, age, password, savedUser, salt, hashedPassword, token, user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, phone = _req$body.phone, sex = _req$body.sex, age = _req$body.age, password = _req$body.password; //checking if user is saved

                _context.next = 4;
                return _user["default"].findOne({
                  email: email
                });

              case 4:
                savedUser = _context.sent;

                if (!savedUser) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  message: 'Your record already exists with us!!'
                }));

              case 7:
                _context.next = 9;
                return _bcryptjs["default"].genSalt(10);

              case 9:
                salt = _context.sent;
                _context.next = 12;
                return _bcryptjs["default"].hash(password, salt);

              case 12:
                hashedPassword = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  email: email
                }, process.env.SECRET, {
                  expiresIn: '20d'
                }); //saving a user to database

                _context.next = 16;
                return _user["default"].create({
                  fullName: fullName,
                  email: email,
                  phone: phone,
                  password: hashedPassword,
                  sex: sex,
                  age: age
                });

              case 16:
                user = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'You have signed up successfully',
                  token: token
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: _context.t0.message
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
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
        var _req$body2, email, password, client, isValidPassword, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // check for errors from validator
                // const error = validationResult(req);
                // if (!error.isEmpty())
                //   return res.status(422).json({ errors: error.array() });
                // Check if client exists

                _context2.next = 4;
                return _user["default"].findOne({
                  email: email
                });

              case 4:
                client = _context2.sent;

                if (client) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: 'Invalid login details'
                }));

              case 7:
                _context2.next = 9;
                return _bcryptjs["default"].compare(password, client.password);

              case 9:
                isValidPassword = _context2.sent;

                if (isValidPassword) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  message: 'Invalid login password'
                }));

              case 12:
                // Generate user token
                token = _jsonwebtoken["default"].sign({
                  email: client.email
                }, process.env.SECRET, {
                  expiresIn: '20d'
                });
                return _context2.abrupt("return", res.status(200).json({
                  message: 'You have logged in successfully',
                  token: token
                }));

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'Internal Server Error',
                  error: _context2.t0
                }));

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 16]]);
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
        var user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _user["default"].find();

              case 3:
                user = _context3.sent;
                res.status(200).json({
                  status: 200,
                  message: "Here's a list of Users",
                  data: user
                });
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  status: 500,
                  message: _context3.t0.message
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
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
        var id, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return _user["default"].findById(id);

              case 4:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: "Here's your search",
                  data: user
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
        var userId, user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                userId = req.params.id;
                _context5.next = 4;
                return _user["default"].findByIdAndDelete(userId, req.body);

              case 4:
                user = _context5.sent;

                if (!user) {
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
                throw new Error('User with this ID was not found');

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
        var userId, user;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                userId = req.params.id;
                _context6.next = 4;
                return _user["default"].findByIdAndUpdate(userId, req.body);

              case 4:
                user = _context6.sent;

                if (!user) {
                  _context6.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: 'Update successful!!'
                });
                _context6.next = 10;
                break;

              case 9:
                throw new Error('User with this ID does not exist');

              case 10:
                _context6.next = 15;
                break;

              case 12:
                _context6.prev = 12;
                _context6.t0 = _context6["catch"](0);
                res.status(500).json(_context6.t0.message);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 12]]);
      }));

      function update(_x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;