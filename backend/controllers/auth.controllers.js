'use strict'

const authServices = require('../services/auth.services')

class authController {
    async SignUp(req, res) {
        try{
            const {email , password , confirm_password , name , authType} = req.body;

            const newUser = await authServices.signUp(email , password , confirm_password , name , authType);

            res.status(201).json({
                success: true,
                message: 'User successfully signed up.',
                user:newUser
            });
        }catch(error){
            console.log(error);
            res.status(400).json({
                success: false,
                message: 'Failed to sign up.',
            });
        }
    }
    async Login(req, res) {
        try {
            const { email, password } = req.body;

            const result = await authServices.login(email, password);

            res.status(200).json({
                success: true,
                message: 'User successfully logged in.',
                token: result.token,
                user: result.user,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to log in.',
            });
        }
    }

}

module.exports = new authController();