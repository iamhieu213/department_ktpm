const mongoose = require('mongoose');

const FeeInvoiceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    fee_id: { type: Number, required: true, ref: "Fee" },
    invoice_id: { type: String, required: true, ref: "Invoice" }
});

module.exports = mongoose.model("FeeInvoice", FeeInvoiceSchema);

