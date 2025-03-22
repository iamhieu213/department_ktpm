const express = require('express');
const router = express.Router();
const passport = require('passport');
const authControllers = require('../controllers/auth.controllers');

router.post('/sign-up', authControllers.SignUp);
router.get('/sign-in', authControllers.Login);

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}), (req, res) => {
    // Đăng nhập thành công, chuyển hướng về trang chính
    res.redirect('/');
});

module.exports = router;