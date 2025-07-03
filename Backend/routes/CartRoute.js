import express from "express"
import { addToCart, getCart , removeFromCart ,clear} from "../controllers/CartController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";


const cartRouter  = express.Router();

cartRouter.post("/add" ,authMiddleWare, addToCart)
cartRouter.post("/getCart" ,authMiddleWare, getCart)
cartRouter.post("/remove" ,authMiddleWare, removeFromCart)
cartRouter.post("/clear" ,authMiddleWare, clear)

export default cartRouter;