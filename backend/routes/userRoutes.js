import express from 'express';
const router = express.Router();
import { loginUser,registerUser,getUser} from '../controllers/userController.js';
import { verify } from '../middleware/authMiddleware.js';
import { loginInputValidation,registerValidation } from '../middleware/validation.js';

//Route to User Registration
router.post('/register',registerValidation,registerUser);
//Route to User Login
router.post('/login', loginInputValidation, loginUser);
//Route to fetch User details
router.get('/', verify, getUser);


export default router;