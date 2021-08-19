"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenvExtended = _interopRequireDefault(require("dotenv-extended"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// dotenv.config();
var environmentFile;
var env = process.env.NODE_ENV || 'development'; // override the default values for these options in the dotenv-extended module

var envOptions = {
  errorOnMissing: env === 'production',
  includeProcessEnv: true
}; // Load appropriate env file for the environment

switch (env) {
  case 'development':
    environmentFile = '.env.local';
    break;

  case 'test':
    environmentFile = '.env.test';
    break;

  case 'production':
    environmentFile = '.env.production';
    break;

  default:
    throw new Error('Invalid NODE_ENV. Ensure the NODE_ENV environment variable is set');
}

if (_fs["default"].existsSync(environmentFile)) {
  envOptions.path = environmentFile;
}

_dotenvExtended["default"].load(envOptions);

var commonConfig = {
  appPort: process.env.PORT || 3000,
  dbName: process.env.DATABASE_NAME,
  connectionString: process.env.DATABASE_URI,
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT
};
var _default = {
  development: _objectSpread(_objectSpread({}, commonConfig), {}, {
    logFormat: 'dev',
    env: 'dev',
    mongooseDebugMode: true
  }),
  test: _objectSpread(_objectSpread({}, commonConfig), {}, {
    logFormat: 'dev',
    env: 'test',
    mongooseDebugMode: false
  }),
  production: _objectSpread(_objectSpread({}, commonConfig), {}, {
    logFormat: 'combined',
    env: 'production',
    mongooseDebugMode: false
  })
}[process.env.NODE_ENV || 'development'];
exports["default"] = _default;