const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    description: { type: String },
    name: { type: String, required: true },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
