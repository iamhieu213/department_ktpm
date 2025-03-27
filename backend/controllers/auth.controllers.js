'use strict'
const authServices = require('../services/auth.services')

class authController {
    async SignUp(req, res) {
        try{
            const {name , email , password , confirm_password ,  authType} = req.body;

            const newUser = await authServices.signUp(name , email , password , confirm_password , authType);

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
    
            const accessToken = await authServices.login(email, password);

            res.status(200).json({
                success: true,
                message: 'User successfully logged in.',
                accessToken: accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to log in.',
            });
        }
    }
    
    async Logout(req, res) {
        try {
            console.log("📩 Request body:", req.body);
            console.log("🛠️ Middleware user:", req.user);
    
            const userId = req.user.id;
            console.log("🚀 User ID in Logout:", userId); 
    
            if (!userId) {
                return res.status(400).json({ success: false, message: "User ID is required for logout." });
            }
    
            await authServices.logout(userId);  
            req.user.accessToken = null;

    
            console.log("✅ Logout successful for user:", userId);
            res.status(200).json({ success: true, message: "User successfully logged out." });
        } catch (error) {
            console.log("❌ Logout error:", error);
            res.status(500).json({ success: false, message: error.message || "Failed to log out." });
        }
    }
    
    async ForgotPassword(req, res) {
        try {
            const { email, newPassword, confirmPassword } = req.body;
    
            // Gọi hàm dịch vụ để xử lý đổi mật khẩu
            await authServices.forgotPassword(email, newPassword, confirmPassword);
    
            res.status(200).json({
                success: true,
                message: 'Đổi mật khẩu thành công.',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: error.message || 'Đổi mật khẩu thất bại.',
            });
        }
    }
    


}

module.exports = new authController();