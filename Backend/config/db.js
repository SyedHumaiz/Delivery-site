import mongoose from "mongoose";

const connectDB = async () => {
    await  mongoose.connect("mongodb+srv://syedhumaiz6:mernproject@cluster0.ivdnkps.mongodb.net/Food-Del")
    .then(()=> {console.log("DB connected")})
}
// mernproject
export default connectDB;