const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: Number, default: 0, enum: [0, 1] }, // 0 = Nữ, 1 = Nam
    cic: { type: Date, default: Date.now }, // Thời gian xác minh
    address_number: { type: Number, ref: "Apartment" },
    status: { type: String },
    status_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resident", ResidentSchema);
