import mongoose from "mongoose";

const connectDB = async () => {
    await  mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("DB connected")})
}
// mernproject
export default connectDB;