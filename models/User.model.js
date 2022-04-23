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
    profilePicture: String,
    images: [String],
    favourites: [{ type: Schema.Types.ObjectId, ref: "Favourite" }],
    connections: [{ type: Schema.Types.ObjectId, ref: "Connection" }],
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
    loc: {
      type: PointSchema,
      required: true,
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
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);


userSchema.index({loc:"2dsphere"});

const User = model("User", userSchema);

module.exports = User;
