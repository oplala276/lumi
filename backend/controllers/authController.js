const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
exports.loginAdmin = async (req, res) => {
 const { username, password, captchaValue } = req.body;
 if (!captchaValue)
   return res.status(400).json({ message: "Captcha validation required" });
// Verify Google reCAPTCHA
 const secretKey = process.env.RECAPTCHA_SECRET;
 const googleUrl =
   `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`;
 let captchaResponse = await axios.post(googleUrl);
 if (!captchaResponse.data.success)
   return res.status(400).json({ message: "Captcha Failed" });
 try {
   const admin = await Admin.findOne({ username });
   if (!admin) return res.status(400).json({ message: "Invalid Credentials" });
   const isMatch = await bcrypt.compare(password, admin.password);
   if (!isMatch)
     return res.status(400).json({ message: "Invalid Credentials" });
   const token = jwt.sign(
     { id: admin._id },
     process.env.JWT_SECRET,
     { expiresIn: "1d" }
   );
   res.json({ message: "Login Success", token });
 } catch (err) {
   res.status(500).send("Server Error");
 }
};
