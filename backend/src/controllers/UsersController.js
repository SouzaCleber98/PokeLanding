import User from "../models/User.js";
import findEmail from "../services/findEmail.js";
import { updateUserToken } from "./SessionsController.js";

class UserController {

    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] } // Exclude password from the response
            });

            res.status(200).json(users);

        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async show(req, res) {
        try {
            const { email } = req
            const data = await findEmail(email);

            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(data);

        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            const { username, email, password } = req.body;

            const existingUser = await findEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            await User.create({ username, email, password })

            res.status(201).json({ message: "User created successfully" });

        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const existingUser = await findEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email already exists" });
            }

            if (username) user.username = username;
            if (email || password) {

                if (email) user.email = email;
                if (password) user.password = password;
                req.wasChangedPasswordOrEmail = true; // Flag to indicate email or password change

            }

            user.updated_At = new Date();

            await user.save();

            const newUserToken = updateUserToken(user)
            res.status(200).json({
                message: "User updated successfully",
                token: newUserToken
            });

        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            const rows = await User.destroy({ where: { id } });

            if (rows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "User deleted successfully" });

        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new UserController();