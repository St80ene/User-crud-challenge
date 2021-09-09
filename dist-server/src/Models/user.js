"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

_dotenv["default"].config();

var User = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  isAdmin: Boolean,
  date: {
    type: Date,
    "default": Date.now
  }
});

User.method.generateAuthToken = function () {
  var token = _jsonwebtoken["default"].sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, process.env.SECRET, {
    expiresIn: '5m'
  });

  return token;
};

var _default = _mongoose["default"].model('user', User);

exports["default"] = _default;