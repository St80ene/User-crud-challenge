import jwt from 'jsonwebtoken';
import User from '../Models/user.js';
import Admin from '../Models/admin.js';

const isUniqueEmail = async (email) => {
  const isClientEmail = await User.findOne({ email });

  if (isClientEmail) throw new Error('Failed! Email already in use!!');
};

const isValidUserToken = async (value) => {
  const token = value.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.SECRET);
  if (!tokenData) throw new Error(tokenData);
  return true;
};

const isUniqueAdminEmail = async (email) => {
  const isClientEmail = await Admin.findOne({ email });

  if (isClientEmail) throw new Error('Failed! Email already in use!!');
};

export default { isUniqueEmail, isValidUserToken, isUniqueAdminEmail };
