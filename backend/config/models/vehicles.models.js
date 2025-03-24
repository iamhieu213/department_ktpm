const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    category: { type: String, enum: ["Motobike", "Car"], required: true },
    apartment_address_number: { type: Number, required: true },
    register_date: { type: Date },
    address_id: { type: Number, required: true, ref: "Apartment" },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
