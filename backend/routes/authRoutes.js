import express from 'express';
import { completeProfile, getProfile, getUsers, loginUser, updateProfile, registerUser, registerAdmin, verifyOtP } from '../controllers/authController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/verify-otp', verifyOtP);
authRouter.post('/complete-profile', completeProfile);

authRouter.post('/login', loginUser);
authRouter.post('/register-admin', registerAdmin);
//Protected routes
authRouter.get('/me', authenticateToken, getProfile)
authRouter.put('/update-profile', authenticateToken, updateProfile)
authRouter.get('/users', authenticateToken, authorizeRoles('admin'), getUsers)
export default authRouter;  