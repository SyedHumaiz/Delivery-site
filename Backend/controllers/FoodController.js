import fs from "fs"
import foodModel from "../models/FoodModel.js";

const addFood =async (req ,res) => {
    const image = req.file.filename;

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image,
    })
    try {
        await food.save()
        res.json({success : true , message : "Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success : false , message : "error occured while adding"})
    }
}

const listFood = async (req, res)=> {
    try {
        const foods = await foodModel.find({})
        res.json({success : true , data : foods })
    } catch (error) {
        console.log(error)
        res.json({success : false , message : "error occured"})
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove the image file if it exists
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error("Image deletion error:", err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Item removed" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};


export {addFood ,listFood , removeFood}