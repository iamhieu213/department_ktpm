const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: false }, // Không bắt buộc với Google
        auth_type: { type: String, enum: ['local', 'google'], required: true },
        google_account_id: { type: String, default: null },
        avatar: { type: String, default: null }, // URL avatar từ Google
        refresh_token: { type: String, default: null },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
