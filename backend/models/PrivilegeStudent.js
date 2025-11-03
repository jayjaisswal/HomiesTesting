const mongoose = require('mongoose');

const privilegeStudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    default: 'https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
  },
  role: {
    type: String,
    required: true,
    default: 'privilege_student'
  },
  hostelNo: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  }
});

const PrivilegeStudent = mongoose.model('PrivilegeStudent', privilegeStudentSchema);

module.exports = PrivilegeStudent;
