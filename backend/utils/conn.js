// const mongoose = require('mongoose');
// require('dotenv').config();
// const mongoURI = process.env.MONGODB_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         });
//         console.log('MongoDB connection SUCCESS');
//     } catch (error) {
//         console.error('MongoDB connection FAIL');
//         process.exit(1);
//     }
//     };


// module.exports = connectDB;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SuperAdmin = require("../models/superAdmin.js");

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection SUCCESS");
  } catch (error) {
    console.error("❌ MongoDB connection FAIL:", error);
    process.exit(1);
  }
};

// ✅ Initialize SuperAdmin
const initSuperAdmin = async () => {
  try {
    const existingAdmin = await SuperAdmin.findOne({ email: "superadmin@gmail.com" });

    if (existingAdmin) {
      console.log("⚠️ SuperAdmin already exists in the database.");
      return;
    }

    const hashedPassword = await bcrypt.hash("superadmin", 10);

    const superAdminData = {
      name: "superadmin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      phoneNo: "+91-7631867534",
      address: "Gndec, Ludhiana, Punjab, India",
      profilePhoto:
        "https://res.cloudinary.com/duthu0r3j/image/upload/v1761640341/QuickChat/photo-1761640337192.jpg",
    };

    const newSuperAdmin = new SuperAdmin(superAdminData);
    await newSuperAdmin.save();

    console.log("🎉 SuperAdmin initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing SuperAdmin:", error);
  } finally {
    mongoose.connection.close();
  }
};

// ✅ Run when file is executed
const start = async () => {
  await connectDB();
//   await initSuperAdmin();
};

start();

module.exports = connectDB;