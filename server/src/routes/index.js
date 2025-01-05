import express from 'express';
import { authenticateToken } from '../middleware/auth'; // Adjusted import path
import authRoutes from './auth-routes'; // Adjusted import path
const router = express.Router();
// Public routes
router.use('/auth', authRoutes);
// Protected routes
router.use('/protected', authenticateToken, (req, res) => {
    res.json({
        message: 'You have access to this protected route!',
        user: req.user // Ensure req.user is typed properly in middleware
    });
});
export default router;
