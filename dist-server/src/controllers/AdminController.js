"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AdminModel = _interopRequireDefault(require("../models/AdminModel"));

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
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _AdminModel["default"].find();

              case 3:
                user = _context.sent;
                res.status(200).json({
                  status: 200,
                  message: "Here's a list of Admins",
                  data: user
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(500).json({
                  status: 500,
                  message: _context.t0.message
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var id, user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                id = req.params.id;
                _context2.next = 4;
                return signUpModel.findById(id);

              case 4:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: "Here's your search",
                  data: user
                });
                _context2.next = 10;
                break;

              case 9:
                throw new Error('User with this ID was not found');

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                res.status(500).json({
                  message: _context2.t0.message
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function getById(_x3, _x4) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var userId, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                userId = req.params.id;
                _context3.next = 4;
                return _AdminModel["default"].findByIdAndDelete(userId, req.body);

              case 4:
                user = _context3.sent;

                if (!user) {
                  _context3.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: "User deleted"
                });
                _context3.next = 10;
                break;

              case 9:
                throw new Error('User with this ID was not found');

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  message: _context3.t0.message
                });

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      function _delete(_x5, _x6) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var userId, user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                userId = req.params.id;
                _context4.next = 4;
                return _AdminModel["default"].findByIdAndUpdate(userId, req.body);

              case 4:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 9;
                  break;
                }

                res.status(200).json({
                  status: 200,
                  message: 'Update successful!!'
                });
                _context4.next = 10;
                break;

              case 9:
                throw new Error('User with this ID does not exist');

              case 10:
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](0);
                res.status(500).json(_context4.t0.message);

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 12]]);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return AdminController;
}();

var _default = AdminController;
exports["default"] = _default;