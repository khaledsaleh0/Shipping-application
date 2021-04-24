import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
//* ============================================================

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please provide your email"],
      match: [/\S+@\S+\.\S+/, "email is invalid"],
    },
    isAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// plugin for passport-local-mongoose for automatically hashing and comparing passwords.
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  errorMessages: {
    UserExistsError: "A user with the given email is already registered.",
  },
});

// ============================================================

const User = mongoose.model("User", userSchema);

//* =============================================

export default User;
