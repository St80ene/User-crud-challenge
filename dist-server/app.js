"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _admins = _interopRequireDefault(require("./routes/admins.js"));

var _db = _interopRequireDefault(require("../server/src/config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import winstonLogger from './src/lib/logger.js'
var app = (0, _express["default"])();

_dotenv["default"].config();

app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use('/', _index["default"]);
app.use('/users', _users["default"]);
app.use('/admins', _admins["default"]);
(0, _db["default"])(); // const dbConnectionOptions = {
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

var _default = app;
exports["default"] = _default;