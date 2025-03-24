const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: Number, default: 0, enum: [0, 1], required: true }, // 0 = Female, 1 = Male
    cic: { type: Date, default: Date.now },
    address_number: { type: Number, ref: "Apartment" },
    status: {
        type: String,
        enum: ["Permanent", "Temporary", "Moved Out", "Deceased"],
        required: true
    },
    status_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resident", ResidentSchema);