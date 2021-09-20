import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import adminRouter from './routes/admins.js';
import databaseConnection from '../server/src/config/db.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Headers':
        "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});
app.use(cors());
app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminRouter);

databaseConnection();

app.use(async (req, res, next) => {
  if (req.headers['x-auth-token']) {
    const accessToken = req.headers['x-auth-token'];
    const { userId, exp } = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: 'JWT token has expired, please login to obtain a new one',
      });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

export default app;
