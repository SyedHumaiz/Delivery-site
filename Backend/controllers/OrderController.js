import express from "express";
import orderModel from "../models/OrderModel.js";

// POST /api/order/place

const placeOrder = async (req, res) => {
    try {
        const { address } = req.body;

        if (!address) return res.status(400).json({ success: false, message: "Address missing" });

        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.cartItems,
            amount: req.body.amount,
            address
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// GET /api/order/user


const user = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId }).sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Order status updated" });
    } catch (err) {
        console.error("Update Order Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const list = async (req, res) => {
        try {
            const orders = await orderModel.find().sort({ date: -1 }); // latest first
            res.json({ success: true, data: orders });
        } catch (err) {
            console.error("Fetch Orders Error:", err);
            res.status(500).json({ success: false, message: "Failed to fetch orders" });
        }
    }


export { placeOrder, user, update ,list};
