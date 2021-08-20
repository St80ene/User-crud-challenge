import Admin from '../Models/admin.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

class AdminController {
  constructor() {
    //
  }

    async login(req, res){
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

      const { email, password } = req.body;
      // Search for unique Admin
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: 'Invalid Login info' });
      // checking password validity
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid login password' });
      }
      // sign admin token
      const token = jwt.sign({ email: admin.email }, process.env.SECRET, {
        expiresIn: '12h',
      });
      return res
        .status(200)
        .json({ message: 'Admin login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server error', error });
    }
  };
}

export default AdminController;
