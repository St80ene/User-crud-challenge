import signUpModel from '../models/signUpModel';
const bycrypt = require('bcryptjs');

class SignUpController {
  constructor() {
    //
  }

  async signUp(req, res) {
    try {
      const { fullName, email, phone, sex, age, password } = req.body;

      //checking if user is saved
      const savedUser = await signUpModel.findOne({ email });
      if (savedUser)
        return res
          .status(400)
          .json({ message: 'Your record already exists with us!!' });

      //hashing user's password
      const hashedPassword = bycrypt.hashSync(password, 10);

      //saving a user to database
      await signUpModel.create({
        fullname: fullName,
        email: email,
        phone: phone,
        password: hashedPassword,
        sex,
        age,
      });
      return res
        .status(200)
        .json({ status: 200, message: 'You have signed up successfully' });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

export default SignUpController;
