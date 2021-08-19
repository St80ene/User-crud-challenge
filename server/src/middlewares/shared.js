import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const isUniqueEmail = async (email) => {
  const isClientEmail = await User.findOne({ email });

  if (isClientEmail) throw new Error('Failed! Email already in use!!');
};

export default isUniqueEmail;
