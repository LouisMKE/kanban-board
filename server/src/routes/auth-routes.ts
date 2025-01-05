import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../../controllers/user-controller';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await getUserByUsername(username);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userPayload = { id: user.id, username: user.username };
        const token = jwt.sign(userPayload, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
