import jwt from 'jsonwebtoken';

const authMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

export default authMiddleWare;
