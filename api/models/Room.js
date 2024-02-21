import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumber: [{
    number: {
      type: Number,
      required: true,
    },
    unavailableDates: {
        type: [Date],
        },
  }],
});

const User = mongoose.model("User", userSchema);

export default User;
