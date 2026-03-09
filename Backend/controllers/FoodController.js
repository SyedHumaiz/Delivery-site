import foodModel from "../models/FoodModel.js";
import { v2 as cloudinary } from "cloudinary";

// ADD FOOD
const addFood = async (req, res) => {
  try {
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "food-delivery"
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.secure_url // save image URL instead of filename
    });

    await food.save();

    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred while adding food" });
  }
};


// LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred" });
  }
};


// REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // delete image from cloudinary
    const imageId = food.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`food-delivery/${imageId}`);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Item removed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred" });
  }
};

export { addFood, listFood, removeFood };