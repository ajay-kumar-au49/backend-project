const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
dotenv.config();

const authRoter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("DB connected successfully");
});

app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('common'));
app.use(helmet());
app.use(cookieParser());

app.use('/', authRoter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(8000, () => {
    console.log("backend server is running");
})