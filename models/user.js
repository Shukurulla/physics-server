import mongoose from "mongoose";

const userModel = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "default",
  },
});

export default userModel;
