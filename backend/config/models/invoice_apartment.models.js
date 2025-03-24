const mongoose = require('mongoose');

const InvoiceApartmentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    address_id: { type: Number, required: true, ref: "Apartment" },
    invoice_id: { type: String, required: true, ref: "Invoice" },
    payment_status: { type: String, enum: ["Paid", "Unpaid"] }
});

module.exports = mongoose.model("InvoiceApartment", InvoiceApartmentSchema);
