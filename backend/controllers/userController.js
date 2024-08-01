import User from '../models/userModel.js';
import generateToken from '../utils/token.js';

// @description: Login a user
// @route: POST /user/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        //Verifying if user exists and passwords match
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            return res.status(200).json({
                message: 'Logged In',
                token
            });
        } else {
            //Error message if any of the user details mismatch during login
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @description: Register a new user
// @route: POST /user/register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            // generateToken(res, user._id);
            return res.status(201).json({
                message: 'Registered Successfully',
                data:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }          
            });
        } else {
            return res.status(400).json({ message: 'Failed to register user' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @description: Get user details
// @route: GET /user
const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            return res.status(200).json({
                message: 'User Details',
                data:{
                    _id: user._id,
                    name: user.name,
                    email: user.email
                 }
                });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    loginUser,
    registerUser,
    getUser
};
