"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./index.js"));

var _logger = _interopRequireDefault(require("../lib/logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dbName = _index["default"].dbName,
    mongooseDebugMode = _index["default"].mongooseDebugMode,
    connectionString = _index["default"].connectionString,
    dbUser = _index["default"].dbUser,
    dbPassword = _index["default"].dbPassword; // this will make mongoose log to the console all db query code so we can learn from it.

_mongoose["default"].set('debug', mongooseDebugMode);

var dbConnectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName: dbName
};

if (process.env.MONGO_DB_AUTH === 'true' && ['staging', 'production'].indexOf(process.env.NODE_ENV || 'development') !== -1) {
  dbConnectionOptions.user = dbUser;
  dbConnectionOptions.pass = dbPassword;
}

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _logger["default"].info('Establishing connection to Database...');

            _context.prev = 1;
            _context.next = 4;
            return _mongoose["default"].connect(connectionString, dbConnectionOptions, function (error) {
              if (error) {
                _logger["default"].error(error.message);

                _logger["default"].error('Error: The server was not able to connect to Database');

                return;
              }

              _logger["default"].info('Successfully connected to Database');
            });

          case 4:
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);

            _logger["default"].error(_context.t0.message);

          case 9:
            _mongoose["default"].connect(connectionString, dbConnectionOptions, function (error) {
              if (error) {
                _logger["default"].error(error.message);

                _logger["default"].error('Error: The server was not able to connect to Database');

                return;
              }

              _logger["default"].info('Successfully connected to Database');
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));
  return _ref.apply(this, arguments);
}