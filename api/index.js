import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import roomRoute from './routes/room.js';
import cookieParser from "cookie-parser";

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
    console.log('Error: ', err);
    });

mongoose.connection.on('disconnected', () =>{
    console.log('Application disconnected from the database');
});

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/user", usersRoute);
app.use("/api/room", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(3001, () => {
    console.log('Example app listening on port 3001! <3');
    });