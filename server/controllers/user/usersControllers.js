import UserModel from '../../models/UserModel.js';
import transporter from '../../utils/email.js'
import bcrypt  from 'bcryptjs'


// Register for user with email OTP

const register_users = async (req, res, next) => {
    try {
      const { name, email, phone, password, status } = req.body;
  
  
      const userExist = await UserModel.findOne({ $or: [{ email }, { phone }] });
      if (userExist) {
        return res.status(400).json({ message: 'User already exists with this email or phone!' });
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000);
      const otpExpiry = Date.now() + 60 * 1000; 
  
  
      const user = new UserModel({
        name,
        email,
        phone,
        password,
        status,
      });
  
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
  
  
      const mailOptions = {
        from: 'mohamedejaz075@gmail.com', 
        to: email,
        subject: 'Your OTP Code',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 500px; margin: 0 auto; color: #333;">
            <h4 style="margin-top: 0; color: #4CAF50;">Hi ${name},</h4>
            <h1 style="font-size: 24px; color: #333;">Your OTP code for registration is: 
              <strong style="color: #ff5722;">${otp}</strong>
            </h1>
            <p style="line-height: 1.6; font-size: 16px;">Please use this code to verify your email address. This OTP is valid for only 60 seconds.</p>
            <p style="margin-top: 20px; line-height: 1.6; font-size: 14px;">Best regards,<br><strong>Your Team</strong></p>
          </div>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
  
       setTimeout(async () => {
        const foundUser = await UserModel.findOne({ email });
        if (foundUser && !foundUser.isVerified && foundUser.otpExpiry < Date.now()) {
          await UserModel.deleteOne({ email });
          console.log(`User with email ${email} deleted due to expired OTP.`);
        }
      }, 60000)
  
  
      res.status(200).json({ message: 'OTP sent successfully!' ,user });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          message: 'Duplicate email or phone detected!',
          error: err.message,
        });
      }
      console.error('Error occurred:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }

// Login user with email and password

const login_users = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }
  
    try {
      const user = await UserModel.findOne({ email });
  
      console.log(']]]]]]', user?.password);
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password!' });
      }
  
      const isMatch = await bcrypt.compare(password, user?.password);
  
      if (isMatch) {
        res.status(200).json({
          user
        });
      } else {
        res.status(400).json({ message: 'Invalid email or password!' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error, please try again later!' });
    }
  }

// Handle GOOGLE register and login 

const handle_google_auth = async (req, res) => {
    try {
      const { credential } = req.body;
      const { name, email, picture } = credential;
  
      
  
      let user = await UserModel.findOne({ email });
      let isNew = false;
  
      if (!user) {
        isNew = true;
        user = new UserModel({
          name,
          email,
          profilePicture: picture,
          isVerified: true,
        });
        await user.save();
      } else {
        if (user.status === 'active') {
  
          user.name = name || user.name;
          user.profilePicture = picture || user.profilePicture;
          await user.save();
        } else {
          return res.status(403).json({
            message: 'Access denied: User is blocked or inactive',
          });
        }
      }
  
      return res.status(200).json({
        message: isNew ? 'Sign-Up successful' : 'Login successful',
        user,
      });
    } catch (error) {
      console.error('Error in Google Authentication:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

// Get current user for header , other use cases
  
const get_current_user = async (req, res) => {
    try {
      const { id } = req.params;
  
      if(!id) console.log('errorr no id')
  
      const currUser = await UserModel.findById(id);
  
      if (!currUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json({
        message: 'User retrieved successfully.',
        currentUser: currUser,
      });
    } catch (error) {
      console.error('Error in getCurrentUser:', error.message);
      res.status(500).json({
        message: 'An error occurred while retrieving user details.',
        error: error.message,
      });
    }
  }

export {
    register_users,
    login_users,
    handle_google_auth,
    get_current_user
}