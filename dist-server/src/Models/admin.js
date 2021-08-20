"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

_dotenv["default"].config();

var Admin = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    "default": 1,
    required: true
  },
  isAdmin: Boolean,
  date: {
    type: Date,
    "default": Date.now
  }
});

Admin.method.generateAuthToken = function () {
  var token = jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, process.env.SECRET, {
    expiresIn: '1d'
  });
  return token;
};

var _default = _mongoose["default"].model('admin', Admin);

exports["default"] = _default;