const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userMod');
const nodemailer = require('nodemailer');

const SALT_ROUNDS = 10

const registerUser = async (req, res) => {
  const { username, email, password, address, role} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({error: 'error occured in json body'})
  } else if (await User.findOne({email})) {
    return res.status(400)
  } else {
    try {
      const hashed = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await User.create({username, email, "password": hashed, address, role})

      return res.status(200).json({error: 'user created successfully ..'})
    } catch (errors) {
      console.log(`error: ${errors}`)
      return res.status(400).json({error: 'An error occured'})
    }
  }

};

const loginAdmin = async (req, res) => {
  
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(password)
  console.log(email)

  if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials: User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log(isMatch)

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials: Incorrect password' });
      }

      const payload = {
        user: {
            id: user.id,
            role: user.role
        }
      };

      jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
              if (err) throw err;
              res.json({ token });
          }
      );
  } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


const loginRecovery = async (req, res) => {
  const { email } = req.body;
  let userid = null;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    userid = user._id;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hareennanayakkara@gmail.com',
        pass: 'jhsr epun nivu sjhl'
      }
    });
    
    var mailOptions = {
      from: 'hareendilrukshananayakkara@gmail.com',
      to: email,
      subject: 'Account Recovery',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h1 style="color: #333; text-align: center;">Password Reset Request</h1>
              <p>Hello,</p>
              <p>You have requested to reset your password. Click the link below to reset your password:</p>
              <p><a href="http://localhost:3000/user/recover/${userid}">Reset Password</a></p>
              <p>If you did not request this, please ignore this email.</p>
              <p>Thank you.</p>
              <p>Regards,<br>Library Team</p>
          </div>
      </div>
      `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
}

 
const passwordRest = async (req, res) => {
  const { userid, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    await User.findByIdAndUpdate(userid, { password: hashedPassword })
    return res.status(200).json({ message: 'Password reset successful' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}



module.exports = { 
  registerUser, 
  loginUser,
  loginRecovery,
  passwordRest,
  loginAdmin
}
