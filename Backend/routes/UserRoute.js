import express from "express"
import {Login , Register} from "../controllers/UserController.js"

const userRouter  = express.Router();

userRouter.post("/login" , Login)
userRouter.post("/register" , Register)

export default userRouter;