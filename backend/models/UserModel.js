import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "provide name"],
    },
    email: {
      type: String,
      require: [true, "provide email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "provide Password"],
    },
    profile_pic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



const userModel = mongoose.model("user",userSchema);


export default userModel;
