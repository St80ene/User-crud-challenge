import User from '../Models/user.js';
import Token from '../Models/token.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import randomString from '../lib/randomCharacterGenerator.js';

dotenv.config();

const emailPassword = process.env.EMAIL_PASSWORD;
const emailSender = process.env.EMAIL_SENDER;
const resetPasswordUrl = process.env.RESET_PASSWORD_URL;
const emailHost = process.env.EMAIL_HOST;

class UserController {
  constructor() {
    //
  }

  async signUp(req, res) {
    try {
      const { fullName, email, phone, sex, age, password } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      //hashing user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: '20d',
      });

      //saving a user to database
      await User.create({
        fullName,
        email,
        phone,
        password: hashedPassword,
        sex,
        age,
      });

      const transporter = nodemailer.createTransport({
        host: emailHost,
        // service: emailService,
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
        subject: `Hello ${fullName}`,
        text: 'Welcome to Customer care platform the king you are. Please log in with your details. This is an automatically generated email. Please do not reply to this email.',
        replyTo: emailSender,
      };

      transporter.sendMail(mailOptions);

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
      const { email, password } = req.body;
      // check for errors from validator
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({ errors: error.array() });

      // Check if client exists
      const client = await User.findOne({ email });

      if (!client)
        return res.status(400).json({ message: 'Invalid login details' });
      // If client exists check password
      const isValidPassword = await bcrypt.compare(password, client.password);
      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Invalid login password',
        });
      }
      // Generate user token
      const token = jwt.sign(
        {
          email: client.email,
        },
        process.env.SECRET,
        {
          expiresIn: '20d',
        }
      );
      return res.status(200).json({
        message: 'You have logged in successfully',
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        error,
      });
    }
  }

  async get(req, res) {
    try {
      const user = await User.find();
      res
        .status(200)
        .json({ status: 200, message: "Here's a list of Users", data: user });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res
          .status(200)
          .json({ status: 200, message: "Here's your search", data: user });
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
      let userId = req.params.id;
      const user = await User.findByIdAndDelete(userId, req.body);
      if (user) {
        res.status(200).json({ status: 200, message: `User deleted` });
      } else {
        throw new Error('User with this ID was not found');
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

      let userId = req.params.id;

      const user = await User.findByIdAndUpdate(userId, req.body);
      if (user) {
        res.status(200).json({ status: 200, message: 'Update successful!!' });
      } else {
        throw new Error('User with this ID does not exist');
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
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({
          message: 'This user does not exist..please try again later.',
        });

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: randomString(6),
        }).save();
      }

      // Send email
      const text = `To reset your password,
      please click the link below.\n\n${resetPasswordUrl}/password-reset/${user._id}/${token.token}`;

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
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json({status: 400, message: 'invalid link or expired' });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res
        .status(400)
        .json({ status: 400, message: 'invalid link or expired' });

      user.password = password;
      await user.save();
      await token.delete();

      return res
        .status(200)
        .json({ status: 200, message: 'Password reset sucessfully. Please login with your new password' });

    } catch (error) {
       return res.status(500).json({
         status: 500,
         message: error.errors.map((err) => err.message.replace(/"/g, '')),
       });
    }
  }
}

export default UserController;
