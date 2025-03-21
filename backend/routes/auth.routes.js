const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');


router.post('/sign-up', authControllers.SignUp);
router.get('/sign-in', authControllers.Login);
module.exports = router;