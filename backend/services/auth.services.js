const Users = require('../config/models/users.models')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class authService {
    async signUp (email , password , confirm_password , name , authType) {
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
        user.refreshToken = refreshToken;
        await user.save();
    
        return {
            success: true,
            message: 'Login successful.',
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                auth_type: user.auth_type,
            },
        };
    }

    async logout(userId) {
        try {
            const user = await Users.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }

            // Xóa refresh token
            user.refreshToken = null;
            await user.save();

            return {
                success: true,
                message: 'Đăng xuất thành công.',
            };
        } catch (error) {
            throw new Error(`Đăng xuất thất bại: ${error.message}`);
        }
    }
    
}

module.exports = new authService();