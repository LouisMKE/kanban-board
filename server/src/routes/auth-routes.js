import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Example validation - replace with real user lookup and password validation
    if (username === 'user' && password === 'password') {
        const user = { username }; // Define user payload
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ accessToken });
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
export default router;
