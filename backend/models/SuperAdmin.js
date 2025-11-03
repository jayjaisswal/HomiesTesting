const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: true, // ✅ important for SuperAdmin
  },
  address: {
    type: String,
  },
  profilePhoto: {
    type: String, // URL or image path
    default: "",
  },
}, { timestamps: true });

// ✅ FIX: Prevent OverwriteModelError
const SuperAdmin =
  mongoose.models.SuperAdmin || mongoose.model("SuperAdmin", superAdminSchema);

module.exports = SuperAdmin;
