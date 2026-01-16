import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password_hash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

pairing: {
  code: String,
  expires_at: Date,
  claimed: {
    type: Boolean,
    default: false,
  },
},

  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
