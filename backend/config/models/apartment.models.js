const mongoose = require("mongoose");
const ApartmentSchema = new mongoose.Schema({
    address_number: { type: Number, required: true, unique: true },
    area: { type: Number, required: true }, // m²
    status: { type: String, enum: ["Residental", "Business", "Vacal"], required: true },
    owner_id: { type: Number, ref: "Resident" },
    owner_phone: { type: Number},
    number_of_members: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
