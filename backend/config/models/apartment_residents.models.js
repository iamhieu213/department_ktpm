'use strict'

const mongoose = require("mongoose");

const ApartmentResidentSchema = new mongoose.Schema({
    resident_id: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
    apartment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true },
    role: { type: String, enum: ["Owner", "Family Member", "Guest"], required: true }, // Vai trò trong căn hộ
    move_in_date: { type: Date, default: Date.now },  // Ngày vào ở
    move_out_date: { type: Date, default: null },      // Ngày rời đi (nếu có)
}, { timestamps: true });

module.exports = mongoose.model("ApartmentResident", ApartmentResidentSchema);
