"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *  currently winston is not configured to store logs to file,
 *  it only replaces console.log() in this project
 */
var logger = _winston["default"].createLogger({
  transports: [new _winston["default"].transports.Console({
    level: 'error',
    format: _winston["default"].format.json()
  }), new _winston["default"].transports.Console({
    level: 'info',
    format: _winston["default"].format.combine(_winston["default"].format.colorize(), _winston["default"].format.simple())
  })]
});

var _default = logger;
exports["default"] = _default;