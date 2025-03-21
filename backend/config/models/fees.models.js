const mongoose = require("mongoose");
const FeeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    fee_type_enum: { type: String, enum: ["ContributionFund", "DeparmentFee"], required: true },
    unit_price: { type: Number, required: true, default: 0.00 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fee", FeeSchema);
