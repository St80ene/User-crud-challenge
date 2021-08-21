import express from 'express';
import pkg from 'express-validator';
import AdminController from '../src/controllers/AdminController.js';
import SharedMiddleware from '../src/middlewares/shared.js';
import authUser from '../src/middlewares/auth.js';
import adminUser from '../src/middlewares/admin.js';

const router = express.Router();

const admin = new AdminController();

const { body, header } = pkg;

/* GET users listing. */
router.get('/', [authUser, adminUser], admin.get);

router.get('/:id', [authUser, adminUser], admin.getById);

router.post(
  '/signup',
  [
    body('Role', 'Failed! Role Field is not permitted').not().exists(),
    body('fullName', 'Failed! Full Name cannot be blank')
      .exists()
      .bail()
      .isString()
      .withMessage('Failed! Full Name must be a string')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Minimum of 3 and max of 10 characters'),
    body('email', 'Email cannot be blank')
      .exists()
      .bail()
      .isEmail()
      .withMessage('Failed! Invalid email format')
      .custom(
        (email) => SharedMiddleware.isUniqueAdminEmail(email),
        body('password', "Failed! Password can't be blank")
          .exists()
          .bail()
          .isString()
          .withMessage('Failed! Password must be a string')
          .isStrongPassword()
          .withMessage(
            'Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}'
          )
      ),
  ],
  admin.signUp
);

router.post(
  '/login',
  [authUser, adminUser],
  [
    body('email', "Failed! Email can't be blank")
      .exists()
      .bail()
      .isEmail()
      .withMessage('Invalid email format'),
    body('password', "Failed! Password can't be blank")
      .exists()
      .bail()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password can't be empty"),
  ],
  admin.login
);

router.put(
  '/edit/:id',
  [authUser, adminUser],
  [
    header('authorization', 'Please specify an authorization header')
      .exists()
      .bail()
      .custom((value) => SharedMiddleware.isValidUserToken(value)),
    body('email', "Failed! Email can't be blank")
      .optional()
      .isEmail()
      .withMessage('Invalid email format')
      .custom((email) => SharedMiddleware.isUniqueAdminEmail(email)),
    body('password', "Failed! Password can't be blank")
      .optional()
      .isStrongPassword()
      .withMessage(
        'Weak password, allowed format is { minLength: 8, minLowerCase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}'
      ),
  ],
  admin.update
);

router.delete('/delete/:id', [authUser, adminUser], admin.delete);

router.post(
  '/forgot-password',
  [
    body('email', "Failed! Email can't be blank")
      .optional()
      .isEmail()
      .withMessage('Invalid email format'),
  ],
  admin.requestPasswordReset
);

router.post(
  '/reset-password/:id/:token',
  [
    body('password', "Failed! Password can't be blank")
      .exists()
      .bail()
      .isString()
      .withMessage('Failed! Password must be a string')
      .isStrongPassword()
      .withMessage(
        'Weak Password, allowed format is: {minLength: 8, minSymbol: 1, minUpperCase: 1, minLowerCase: 1}'
      )
      .custom((email) => SharedMiddleware.isUniqueAdminEmail(email)),
  ],
  admin.passwordReset
);

export default router;
