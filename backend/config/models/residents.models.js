const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phone: { type: String, unique: true, required: true },
    email: { type: String, unique: true, sparse: true }, // Cho phép giá trị null nếu không có email
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }, // Trạng thái cư dân
}, { timestamps: true });

module.exports = mongoose.model("Resident", ResidentSchema);
