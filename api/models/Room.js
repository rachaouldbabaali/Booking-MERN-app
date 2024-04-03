import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
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

const Room = mongoose.model("Room", roomSchema);

export default Room;
