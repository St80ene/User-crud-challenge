import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('user', User);
