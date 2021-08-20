"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _accesscontrol = require("accesscontrol");

var accessControl = new _accesscontrol.AccessControl();

var roles = function () {
  accessControl.grant('basic').readOwn('profile').updateOwn('profile');
  accessControl.grant('supervisor').extend('basic').readAny('profile');
  accessControl.grant('admin').extend('basic').extend('supervisor').updateAny('profile').deleteAny('profile');
  return accessControl;
}();

var _default = roles;
exports["default"] = _default;