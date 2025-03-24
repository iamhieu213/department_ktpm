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

// Khởi tạo session để sử dụng với Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,  // Tránh tạo session không cần thiết
    cookie: { 
        secure: process.env.NODE_ENV === 'production',  // Chỉ bật secure khi production
        httpOnly: true,  
        sameSite: 'lax',
    }
}));

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session());

// Kết nối cơ sở dữ liệu
connectDb();
    

// Route chính
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

// Đăng nhập với Google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback từ Google
app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');  // Redirect về trang chủ sau khi đăng nhập
    }
);

// API routes
app.use('/api', require('./routes/api'));

// Xử lý lỗi
app.use((err, req, res, next) => {
    console.error('❌ Lỗi:', err.message);
    res.status(500).json({ 
        success: false,
        message: 'Đã xảy ra lỗi trên server.',
        error: err.message
    });
});

module.exports = app;
