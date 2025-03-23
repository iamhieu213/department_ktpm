const express = require('express');
const dotenv = require('dotenv');
const passport = require('./config/passport');  // Import Passport từ file riêng
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();

const connectDb = require('./config/db');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',  // Địa chỉ frontend
    credentials: true                
}));

// Khởi tạo session để sử dụng với Passport
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,   // Đặt thành true nếu dùng HTTPS
        httpOnly: true,  
        sameSite: 'lax',
    }
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Kết nối cơ sở dữ liệu
connectDb(app);

// Route chính
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// Sử dụng API routes
app.use('/api', require('./routes/api'));

// Xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Đã xảy ra lỗi trên server.');
});

module.exports = app;
