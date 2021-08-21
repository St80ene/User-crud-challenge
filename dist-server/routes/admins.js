"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _AdminController = _interopRequireDefault(require("../src/controllers/AdminController.js"));

var _shared = _interopRequireDefault(require("../src/middlewares/shared.js"));

var _auth = _interopRequireDefault(require("../src/middlewares/auth.js"));

var _admin = _interopRequireDefault(require("../src/middlewares/admin.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var admin = new _AdminController["default"]();
var body = _expressValidator["default"].body,
    header = _expressValidator["default"].header;
/* GET users listing. */

router.get('/', [_auth["default"], _admin["default"]], admin.get);
router.get('/:id', [_auth["default"], _admin["default"]], admin.getById);
router.post('/signup', [body('Role', 'Failed! Role Field is not permitted').not().exists(), body('fullName', 'Failed! Full Name cannot be blank').exists().bail().isString().withMessage('Failed! Full Name must be a string').trim().isLength({
  min: 3,
  max: 30
}).withMessage('Minimum of 3 and max of 10 characters'), body('email', 'Email cannot be blank').exists().bail().isEmail().withMessage('Failed! Invalid email format').custom(function (email) {
  return _shared["default"].isUniqueAdminEmail(email);
}, body('password', "Failed! Password can't be blank").exists().bail().isString().withMessage('Failed! Password must be a string').isStrongPassword().withMessage('Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}'))], admin.signUp);
router.post('/login', [_auth["default"], _admin["default"]], [body('email', "Failed! Email can't be blank").exists().bail().isEmail().withMessage('Invalid email format'), body('password', "Failed! Password can't be blank").exists().bail().trim().not().isEmpty().withMessage("Password can't be empty")], admin.login);
router.put('/edit/:id', [_auth["default"], _admin["default"]], [header('authorization', 'Please specify an authorization header').exists().bail().custom(function (value) {
  return _shared["default"].isValidUserToken(value);
}), body('email', "Failed! Email can't be blank").optional().isEmail().withMessage('Invalid email format').custom(function (email) {
  return _shared["default"].isUniqueAdminEmail(email);
}), body('password', "Failed! Password can't be blank").optional().isStrongPassword().withMessage('Weak password, allowed format is { minLength: 8, minLowerCase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}')], admin.update);
router["delete"]('/delete/:id', [_auth["default"], _admin["default"]], admin["delete"]);
router.post('/forgot-password', [body('email', "Failed! Email can't be blank").optional().isEmail().withMessage('Invalid email format')], admin.requestPasswordReset);
router.post('/reset-password/:id/:token', [body('password', "Failed! Password can't be blank").exists().bail().isString().withMessage('Failed! Password must be a string').isStrongPassword().withMessage('Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}').custom(function (email) {
  return _shared["default"].isUniqueAdminEmail(email);
})], admin.passwordReset);
var _default = router;
exports["default"] = _default;