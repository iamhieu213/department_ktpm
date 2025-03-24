const express = require('express');
const router = express.Router();
const passport = require('../controllers/passport');
const authControllers = require('../controllers/auth.controllers');

router.post('/sign-up', authControllers.SignUp);
router.post('/sign-in', authControllers.Login);
router.post('/forgot-password', authControllers.ForgotPassword);

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    // Đăng nhập thành công, chuyển hướng về trang chính
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(400).json({ success: false, message: 'Bạn chưa đăng nhập!' });
    }
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng xuất.' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Đã xảy ra lỗi khi hủy phiên.' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Đăng xuất thành công.' });
        });
    });
});
module.exports = router;