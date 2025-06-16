import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide a username!"],
  },
  email: {
    type: String,
    required: [true, "Provide an email!"],
  },
  password: {
    type: String,
    required: [true, "Provide a password!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

  reputation: {
    type: Number,
    default: 0,
  },

  // ✅ Add this
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
