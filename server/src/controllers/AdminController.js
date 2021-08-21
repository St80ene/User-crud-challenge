import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Admin from '../Models/admin.js';
import adminToken from '../Models/adminToken.js';
import randomString from '../lib/randomCharacterGenerator.js';
// import admin from '../Models/admin.js';

dotenv.config();

const emailPassword = process.env.EMAIL_PASSWORD;
const emailSender = process.env.EMAIL_SENDER;
const resetPasswordUrl = process.env.RESET_PASSWORD_URL;
const emailHost = process.env.EMAIL_HOST;


class AdminController {
  async signUp(req, res) {
    try {
      const { email, password, isAdmin } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      //hashing user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      
      //saving a user to database
      const admin = await Admin.create({
        email,
        password: hashedPassword,
        isAdmin,
      });
      
      const token = jwt.sign({ _id: admin._id, isAdmin: admin.isAdmin }, process.env.SECRET, {
        expiresIn: '1d',
      });
      return res.status(200).json({
        status: 200,
        message: 'You have signed up successfully',
        token,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  async login(req, res) {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { email, password } = req.body;
      // Search for unique Admin
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res.status(400).json({ message: 'Invalid Login info' });
      // checking password validity
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid login password' });
      }
      // sign admin token
      const token = jwt.sign(
        { _id: admin._id, isAdmin: admin.isAdmin },
        process.env.SECRET,
        {
          expiresIn: '1d',
        }
      );
      return res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server error', error });
    }
  }

  async get(req, res) {
    try {
      console.log('searching...');
      const admin = await Admin.find();
      if (!admin.length) {
        return res
          .status(200)
          .json({
            status: 200,
            message: "No Administrators available yet...please sign up",
          });
      }
      return res
        .status(200)
        .json({ status: 200, message: "Here's a list of Administrators", data: admin });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const admin = await Admin.findById(id);
      if (admin) {
        res
          .status(200)
          .json({ status: 200, message: "Here's your search", data: admin });
      } else {
        throw new Error('User with this ID was not found');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    // get the id from request
    try {
      let adminId = req.params.id;
      const admin = await Admin.findByIdAndDelete(adminId, req.body);
      if (admin) {
        res.status(200).json({ status: 200, message: `User deleted` });
      } else {
        throw new Error('Admin with this ID was not found');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      // check for errors from validator
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      let adminId = req.params.id;

      const admin = await Admin.findByIdAndUpdate(adminId, req.body);
      if (admin) {
        res.status(200).json({ status: 200, message: 'Update successful' });
      } else {
        throw new Error('Admin with this ID does not exist');
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      const { email } = req.body;
      // Find unique user
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res.status(400).json({
          message: 'This admin does not exist..please try again later.',
        });

      let token = await adminToken.findOne({ adminId: admin._id });
      if (!token) {
        token = await new adminToken({
          userId: admin._id,
          token: randomString(6),
        }).save();
      }

      // Send email
      const text = `To reset your password,
      please click the link below.\n\n${resetPasswordUrl}/password-reset/${admin._id}/${token.token}`;

      const subject = 'Forgot Password';

      // send email notification

      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: 465,
        secure: true,
        auth: {
          user: emailSender,
          pass: emailPassword,
        },
        tls: {
          secureProtocol: 'TLSv1_method',
        },
      });

      const mailOptions = {
        from: `${emailSender}`,
        to: email,
        subject,
        text,
        replyTo: emailSender,
      };

      transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json('Password reset link sent to your email account');
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  async passwordReset(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      const { password } = req.body;
      const admin = await Admin.findById(req.params.id);
      if (!admin)
        return res
          .status(400)
          .json({ status: 400, message: 'invalid link or expired' });

      const token = await adminToken.findOne({
        adminId: admin._id,
        token: req.params.token,
      });
      if (!token)
        return res
          .status(400)
          .json({ status: 400, message: 'invalid link or expired' });

      user.password = password;
      await admin.save();
      await token.delete();

      return res.status(200).json({
        status: 200,
        message:
          'Password reset sucessfully. Please login with your new password',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.errors.map((err) => err.message.replace(/"/g, '')),
      });
    }
  }
}

export default AdminController;
