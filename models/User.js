import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please enter your name"],
    },
    email: {
      type: String,
      require: [true, "Please enter your email"],
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message:"Please enter the valid email"
      },
    },
    country: {
      type: String,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    job_position:{
      type: String,
    },
    password: {
      type: String,
      require: [true, "please enter your password"],
      minlength:[6, "Password must be at least 6 charactor"],
    },
    status:{
      type: String,
      enum:["Active", "Inactive"],
      default: "Active"
    },
    role: {
      type: String,
      enum: ["admin", "employee", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);