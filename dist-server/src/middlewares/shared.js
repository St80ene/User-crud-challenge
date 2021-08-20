"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../Models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isUniqueEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
    var isClientEmail;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: email
            });

          case 2:
            isClientEmail = _context.sent;

            if (!isClientEmail) {
              _context.next = 5;
              break;
            }

            throw new Error('Failed! Email already in use!!');

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isUniqueEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isValidUserToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
    var token, tokenData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            token = value.split(' ')[1];
            tokenData = _jsonwebtoken["default"].verify(token, process.env.SECRET);

            if (tokenData) {
              _context2.next = 4;
              break;
            }

            throw new Error(tokenData);

          case 4:
            return _context2.abrupt("return", true);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isValidUserToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  isUniqueEmail: isUniqueEmail,
  isValidUserToken: isValidUserToken
};
exports["default"] = _default;