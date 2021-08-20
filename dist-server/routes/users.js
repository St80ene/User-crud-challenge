"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _userController = _interopRequireDefault(require("../src/controllers/userController.js"));

var _shared = _interopRequireDefault(require("../src/middlewares/shared.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import allowIfLoggedin from '../src/middlewares/authLogin.js';
// import grantAccess from '../src/middlewares/grantAccess.js';
var router = _express["default"].Router();

var user = new _userController["default"]();
var body = _expressValidator["default"].body,
    header = _expressValidator["default"].header;
/* GET users listing. */

router.get('/', // allowIfLoggedin,
// grantAccess('readAny', 'profile'),
user.get);
router.get('/:id', user.getById);
router.post('/signup', [body('Role', 'Failed! Role Field is not permitted').not().exists(), body('fullName', 'Failed! Last Name cannot be blank').exists().bail().isString().withMessage('Failed! Last Name must be a string').trim().isLength({
  min: 3,
  max: 30
}).withMessage('Minimum of 3 and max of 10 characters'), body('email', 'Email cannot be blank').exists().bail().isEmail().withMessage('Failed! Invalid email format').custom(function (email) {
  return _shared["default"].isUniqueEmail(email);
}, body('password', "Failed! Password can't be blank").exists().bail().isString().withMessage('Failed! Password must be a string').isStrongPassword().withMessage('Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}'))], user.signUp);
router.post('/login', [body('email', "Failed! Email can't be blank").exists().bail().isEmail().withMessage('Invalid email format'), body('password', "Failed! Password can't be blank").exists().bail().trim().not().isEmpty().withMessage("Password can't be empty")], user.login);
router.put('/edit/:id', // allowIfLoggedin,
// grantAccess('updateAny', 'profile'),
[header('authorization', 'Please specify an authorization header').exists().bail().custom(function (value) {
  return _shared["default"].isValidUserToken(value);
}), body('firstName', 'Failed! First Name cannot be blank').optional().isString().withMessage('Failed. First name must be a string').trim().isLength({
  min: 4,
  max: 10
}).withMessage('Minimum of 4 and maximum of 10 characters'), body('lastName', 'Failed! Last Name cannot be blank').optional().isString().withMessage('Failed. Last name must be a string').trim().isLength({
  min: 4,
  max: 10
}).withMessage('Minimum of 4 and maximum of 10 characters'), body('email', "Failed! Email can't be blank").optional().isEmail().withMessage('Invalid email format').custom(function (email) {
  return _shared["default"].isUniqueEmail(email);
}), body('password', "Failed! Password can't be blank").optional().isStrongPassword().withMessage('Weak password, allowed format is { minLength: 8, minLowerCase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}')], user.update);
router["delete"]('/delete/:id', // allowIfLoggedin,
// grantAccess('deleteAny', 'profile'),
user["delete"]);
router.post('/forgot-password', [body('email', "Failed! Email can't be blank").optional().isEmail().withMessage('Invalid email format')], user.requestPasswordReset);
router.post('/reset-password/:id/:token', [body('password', "Failed! Password can't be blank").exists().bail().isString().withMessage('Failed! Password must be a string').isStrongPassword().withMessage('Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}').custom(function (email) {
  return _shared["default"].isUniqueEmail(email);
})], user.passwordReset);
var _default = router;
exports["default"] = _default;