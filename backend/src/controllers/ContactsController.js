import Contact from "../models/Contact.js";
import validarCPF from "../services/cpfValidate.js";

class ContactsController {
    async store(req, res) {
        try {
            const { username, email, cpf, body } = req.body;

            if (!username || !email || !cpf || !body) {
                return res.status(400).json({ error: "All fields are required." });
            }

            if (!validarCPF(cpf)) {
                return res.status(400).json({ error: "Invalid CPF." });
            }

            const contact = await Contact.create({ username, email, cpf, body, created_At: new Date() });

            return res.status(201).json(contact);
        } catch (error) {
            console.error("Error creating contact:", error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default new ContactsController();