const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
    address_number: { type: String, required: true, unique: true }, // Số căn hộ
    area: { type: Number, required: true }, // Diện tích m2
    status: { type: String, enum: ["Available", "Occupied", "Under Maintenance"], default: "Available" }, // Tình trạng căn hộ
}, { timestamps: true });

module.exports = mongoose.model("Apartment", ApartmentSchema);