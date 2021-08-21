import mongoose from 'mongoose';
const { Schema } = mongoose;
import dotenv from 'dotenv';

dotenv.config();

const Admin = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

// Admin.method.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     process.env.SECRET,
//     { expiresIn: '1d' }
//   );

//   return token;
// };

export default mongoose.model('admin', Admin);
