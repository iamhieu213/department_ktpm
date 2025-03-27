const express = require('express');
const router = express.Router();
const passport = require('../controllers/passport');
const authMiddleware = require('../middleWare/auth.middleWares');
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

router.post("/logout", authMiddleware,authControllers.Logout);


module.exports = router;