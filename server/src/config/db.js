import mongoose from 'mongoose';
import config from './index.js';
import logger from '../lib/logger.js';

const { dbName, mongooseDebugMode, connectionString, dbUser, dbPassword } =
  config;
// this will make mongoose log to the console all db query code so we can learn from it.
mongoose.set('debug', mongooseDebugMode);

const dbConnectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  dbName,
};

if (
  process.env.MONGO_DB_AUTH === 'true' &&
  ['staging', 'production'].indexOf(process.env.NODE_ENV || 'development') !==
    -1
) {
  dbConnectionOptions.user = dbUser;
  dbConnectionOptions.pass = dbPassword;
}

export default async function () {
  logger.info('Establishing connection to Database...');
  try {
    await mongoose.connect(connectionString, dbConnectionOptions, (error) => {
      if (error) {
        logger.error(error.message);
        logger.error('Error: The server was not able to connect to Database');
        return;
      }

      logger.info('Successfully connected to Database');
    })
  } catch (error) {
    logger.error(error.message)
  }
  mongoose.connect(connectionString, dbConnectionOptions, (error) => {
    if (error) {
      logger.error(error.message);
      logger.error('Error: The server was not able to connect to Database');
      return;
    }

    logger.info('Successfully connected to Database');
  });
}

