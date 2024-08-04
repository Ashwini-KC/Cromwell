import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//To verify the token 
const verify = async(req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, Authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password'); // Fetch user without password
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export { verify }