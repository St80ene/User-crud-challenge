import express from 'express';
import pkg from 'express-validator';
import UserController from '../src/controllers/userController.js';
import isUniqueEmail from '../src/middlewares/shared.js';

const router = express.Router();

const user = new UserController();

const { body, header } = pkg;

/* GET users listing. */
router.get('/', user.get);

router.get('/:id', user.getById);

router.post(
  '/signup',
  [
    body('Role', 'Failed! Role Field is not permitted').not().exists(),
    body('fullName', 'Failed! Last Name cannot be blank')
      .exists()
      .bail()
      .isString()
      .withMessage('Failed! Last Name must be a string')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Minimum of 3 and max of 10 characters'),
    body('email', 'Email cannot be blank')
      .exists()
      .bail()
      .isEmail()
      .withMessage('Failed! Invalid email format')
      .custom(
        (email) => isUniqueEmail(email),
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
  user.signUp
);

router.put('/edit/:id', user.update);

router.delete('/delete/:id', user.delete);

router.post('/login', user.login);

export default router;
