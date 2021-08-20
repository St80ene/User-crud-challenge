import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminToken = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'admin',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default mongoose.model('adminToken', adminToken);
