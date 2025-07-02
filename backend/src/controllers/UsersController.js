import User from "../models/User.js";

class UserController {
    async show(req, res) {
        try {
            const {email} = req
            const data = await User.findOne({ where: { email } });

            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }

            // Exclude password from the response
            const user = data.toJSON();
            delete user.password;
            
            res.status(200).json(user);

        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            const { username, email, password } = req.body;

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

            const updateData = {};
            if (username) updateData.username = username;
            if (email) updateData.email = email;
            if (password) updateData.password = password;
            updateData.updated_At = new Date();

            const [rows] = await User.update(updateData,
                { where: { id } });

            if (rows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ message: "User updated successfully" });

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