import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) return res.status(401).json({ status: 401, message: 'Access denied. No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(400).json({status: 400, message: 'Invalid token'})
  }
}

export default authUser;