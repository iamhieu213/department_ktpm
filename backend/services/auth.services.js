const Users = require('../config/models/users.models')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Error } = require('mongoose');


class authService {
    async signUp (name , email , password , confirm_password ,  authType) {
        //check required fiedls
        if(!email || !password || !confirm_password || !name){
            throw new Error('Missing required fields.');
        }

        //check isMatchPassword
        if(confirm_password !== password ){
            throw new Error('Passwords is not match.');
        }

        //check isExistEmail
        if(!Users.findOne({email: email })){
            throw new Error('email is already in use.');
        }

        //hash password
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);

        const newUsers = await Users.create({
            email: email,
            password: hashedPassword,
            name: name,
            auth_type: authType,
        })

        await newUsers.save();

        return {
            users: newUsers
        }
    }

    async login(email, password) {
        // Check required fields
        if (!email || !password) {
            throw new Error('Missing required fields.');
        }
    
        // Check if user exists
        const user = await Users.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist.');
        }
    
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password.');
        }
    
        // Create Access Token
        const accessToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '29m' } // Token valid for 15 minutes
        );
    
        // Create Refresh Token
        const refreshToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '14d' } // Token valid for 14 days
        );
    
        // Save Refresh Token to the database (or in-memory store)
        user.refresh_token = refreshToken;
        await user.save();

        return accessToken;
    }

    async logout(userId) {
        
    
        if (!userId) {
            throw new Error("❌ Missing userId in logout service");
        }
    
        const user = await Users.findById(userId);
       
    
        if (!user) {
            throw new Error("❌ User not found.");
        }
    
        user.refresh_token = null;
        await user.save();
    
        return { success: true, message: "Logout successful." };
    }
    

    async forgotPassword(email, newPassword, confirmPassword) {
        try {
            // Kiểm tra xem email có được cung cấp không
            if (!email || !newPassword || !confirmPassword) {
                throw new Error('Thiếu thông tin bắt buộc.');
            }
    
            // Kiểm tra xem người dùng có tồn tại hay không
            const user = await Users.findOne({ email });
            if (!user) {
                throw new Error('Email không tồn tại.');
            }
    
            // Kiểm tra xác nhận mật khẩu
            if (newPassword !== confirmPassword) {
                throw new Error('Mật khẩu xác nhận không khớp.');
            }
    
            // Băm mật khẩu mới
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
    
            // Cập nhật mật khẩu mới
            user.password = hashedPassword;
            await user.save();
    
            return {
                success: true,
                message: 'Đổi mật khẩu thành công.',
            };
        } catch (error) {
            throw new Error(`Đổi mật khẩu thất bại: ${error.message}`);
        }
    }
    
    
}

module.exports = new authService();