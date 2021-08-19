"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _signUpModel = _interopRequireDefault(require("../models/signUpModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var bycrypt = require('bcryptjs');

var SignUpController = /*#__PURE__*/function () {
  function SignUpController() {//

    _classCallCheck(this, SignUpController);
  }

  _createClass(SignUpController, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, fullName, email, phone, sex, age, password, savedUser, hashedPassword;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, phone = _req$body.phone, sex = _req$body.sex, age = _req$body.age, password = _req$body.password; //checking if user is saved

                _context.next = 4;
                return _signUpModel["default"].findOne({
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
                //hashing user's password
                hashedPassword = bycrypt.hashSync(password, 10); //saving a user to database

                _context.next = 10;
                return _signUpModel["default"].create({
                  fullname: fullName,
                  email: email,
                  phone: phone,
                  password: hashedPassword,
                  sex: sex,
                  age: age
                });

              case 10:
                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'You have signed up successfully'
                }));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  message: _context.t0.message
                }));

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }]);

  return SignUpController;
}();

var _default = SignUpController;
exports["default"] = _default;