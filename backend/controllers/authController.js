const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken, verifyToken } = require('../utils/auth');
const SuperAdmin = require('../models/SuperAdmin');

// 🟩 Super Admin Login
exports.login = async (req, res, next) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
    }

    const token = generateToken(admin.id, admin.isAdmin);

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          phoneNo: admin.phoneNo,
          isAdmin: admin.isAdmin,
          address: admin.address,
          profilePhoto: admin.profilePhoto,
        },
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 🟨 Change Password
exports.changePassword = async (req, res, next) => {
  let success = false;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password, newPassword } = req.body;

    const admin = await SuperAdmin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
    }

    const oldPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!oldPasswordMatch) {
      return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedNewPassword;
    await admin.save();

    success = true;
    res.status(200).json({ success, msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 🟦 Verify Token Session
exports.verifySession = async (req, res, next) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    const { token } = req.body;
    const decoded = verifyToken(token);

    if (decoded) {
      success = true;
      return res.status(200).json({ success, data: decoded });
    }

    return res.status(400).json({ success, message: 'Invalid token' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success, message: 'Server Error' });
  }
};
