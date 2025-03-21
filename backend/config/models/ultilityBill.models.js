const mongoose = require("mongoose");

const UtilityBillSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address_id: { type: Number, required: true, ref: "Apartment" },
    created_at: { type: Date, default: Date.now },
    date: { type: String },
    water: { type: Number },
    electricity: { type: Number },
    internet: { type: Number },
    payment_status: { type: String, enum: ["Paid", "Unpaid"] }
});

module.exports = mongoose.model("UtilityBill", UtilityBillSchema);
