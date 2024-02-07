

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "cloudinary";
/* REGISTER USER */ 


export const register = async (req, res) => {
  console.log(req.file);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
     
      friends,
      location,
      occupation,
    } = req.body;

    let picturePath;
    if (req.file) { 
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        picturePath = result.secure_url;
      }
      catch (err) {
        console.log(err);
      }
      
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
