const { Schema, model } = require("mongoose");
const PointSchema  = require("../schemas/Point.schema");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    birthDate: Date,
    description: String,
    profilePicture: Object,
    pronouns: { type: String, enum: ['he/him', 'she/her', 'they,them', 'other'] },
    images: [Object],
    favourites: [{ type: Schema.Types.ObjectId, ref: "User" }],
    connections: [{ type: Schema.Types.ObjectId, ref: "User" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
    loc: {
      type: PointSchema,
      index: '2dsphere'
    },
    budgetRange: {
      min: Number,
      max: Number
    },
    moveDateRange: {
      start: Date,
      end: Date
    },
    languages: [String],
    country: String,
    isOnboarded: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


userSchema.index({loc:"2dsphere"});

const User = model("User", userSchema);

module.exports = User;
