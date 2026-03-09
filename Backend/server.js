import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config'
import "./config/cloudinary.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from './routes/OrderRoute.js';




const app = express();
const port = 4000;

app.use(cors(
    {
        origin : ["https://delivery-site-admin.vercel.app", "https://delivery-site-app.vercel.app"],
        methods :["POST", "GET", "PUT", "DELETE"],
        credentials : true
    }
))


app.use(express.json())
app.use("/api/food" , foodRouter)
app.use("/api/user" , userRouter)
app.use("/api/order", orderRouter)
app.use("/api/cart" , cartRouter)
app.use("/images" , express.static("uploads") )


connectDB();

app.get("/" , (req , res ) => {
    res.send("API WORKING")
})
app.listen(port , ()=> console.log('server started on port ' ,port,process.env.CLOUD_NAME,process.env.API_KEY))

