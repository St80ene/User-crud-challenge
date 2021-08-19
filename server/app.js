import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import adminRouter from './routes/admins.js';
import databaseConnection from '../server/src/config/db.js';
// import winstonLogger from './src/lib/logger.js'

const app = express();
dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admins', adminRouter);

databaseConnection();

// const dbConnectionOptions = {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };

// const connectionString = process.env.DATABASE_URI;
// mongoose.connect(connectionString, dbConnectionOptions, (error) => {
//   if (error) {
//     winstonLogger.error(error.message);
//     winstonLogger.error('Error: The server was not able to connect to Database');
//     return;
//   }

//   winstonLogger.info('Successfully connected to Database');
// });

export default app;
