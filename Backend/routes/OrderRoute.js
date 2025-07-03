import express from "express"
import { list, placeOrder , update, user} from "../controllers/OrderController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";


const orderRouter  = express.Router();

orderRouter.post("/place" ,authMiddleWare, placeOrder)
orderRouter.get("/user" ,authMiddleWare, user)
orderRouter.get("/list" , list)
orderRouter.post("/update" , update)

export default orderRouter;