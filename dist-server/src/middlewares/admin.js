"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAdmin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.user.isAdmin) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              status: 403,
              message: 'Access denied. You are not an Admin'
            }));

          case 2:
            next();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isAdmin;
exports["default"] = _default;