import userModel from "../models/UserModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemID]) {
      cartData[req.body.itemID] = 1;
    } else {
      cartData[req.body.itemID] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    const itemID = req.body.itemID;

    if (cartData[itemID]) {
      cartData[itemID] -= 1;
      if (cartData[itemID] <= 0) {
        delete cartData[itemID]; // ✅ Remove item completely if quantity is 0
      }
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    res.json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear user's cart
const clear = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, removeFromCart, getCart, clear };
