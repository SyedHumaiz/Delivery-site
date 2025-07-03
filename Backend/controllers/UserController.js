import bcrypt from "bcrypt";
import userModel from "../models/UserModel.js";
import validator from "validator"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY)
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Account doesn't exists" })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Enter correct Password" })
        }

        const token = generateToken(user._id)
        console.log(token)
        return res.json({ success: true, token: token })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Error" })
    }
}


const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "Account already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = generateToken(user._id)
        console.log(token)
        return res.json({ success: true, token: token })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Error" })
    }
}

export { Login, Register }