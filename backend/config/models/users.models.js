const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        auth_type: { type: String },
        google_account_id: { type: String, default: null },
        refresh_token: { type: String, default: null },

        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
