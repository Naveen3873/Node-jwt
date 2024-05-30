const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection is Successfully..."))
    .catch((err) => console.log(`DB Connection error : ${err}`));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected',protectedRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend Server is Running in: ${PORT || 5000}`);
})