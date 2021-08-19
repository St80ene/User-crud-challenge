"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _userController = _interopRequireDefault(require("../src/controllers/userController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var user = new _userController["default"]();
/* GET users listing. */

router.get('/', user.get);
router.get('/:id', user.getById);
router.post('/signup', [body('Role', 'Failed! Role Field is not permitted').not().exists(), body('firstName', 'Failed! First Name cannot be blank').exists().bail().isString().withMessage('Failed! First Name must be a string').trim().isLength({
  min: 3,
  max: 10
}).withMessage('Minimum of 3 and max of 10 characters'), body('lastName', 'Failed! Last Name cannot be blank').exists().bail().isString().withMessage('Failed! Last Name must be a string').trim().isLength({
  min: 3,
  max: 10
}).withMessage('Minimum of 3 and max of 10 characters'), body('email', 'Email cannot be blank').exists().bail().isEmail().withMessage('Failed! Invalid email format').custom(function (email) {
  return SharedMiddleware.isUniqueEmail(email);
}, body('password', "Failed! Password can't be blank").exists().bail().isString().withMessage('Failed! Password must be a string').isStrongPassword().withMessage('Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}'))], user.signUp);
router.put('/edit/:id', user.update);
router["delete"]('/delete/:id', user["delete"]);
router.post('/login', user.login);
var _default = router;
exports["default"] = _default;