import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Object, required: true }, // assuming key-value pair of cart
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Processing" },
    date: { type: Date, default: Date.now }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
