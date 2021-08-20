"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var adminToken = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'admin'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    expires: 3600
  }
});

var _default = _mongoose["default"].model('adminToken', adminToken);

exports["default"] = _default;