import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class SessionsController {
    async create(req, res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const { email, password } = req.body;

            const data = await User.findOne({
                where: {
                    email
                },
                rejectOnEmpty: true
            });

            if (!(await data.checkPassword(password))) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({
                id: data.id,
                email: data.email
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d'
                });

            return res.status(200).json({ token })
        } catch (error) {
            console.error("Error creating session:", error);
            if (error.name === 'SequelizeEmptyResultError') {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new SessionsController();