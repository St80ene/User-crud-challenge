"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function randomString(count) {
  var length = count;
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';

  for (var index = length; index > 0; --index) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  return result;
}

var _default = randomString;
exports["default"] = _default;