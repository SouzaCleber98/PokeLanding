import Sequelize, { Model } from "sequelize";

class Contact extends Model {
    static init(sequelize) {
        super.init(
            {
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                cpf: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                body: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "contacts",
                updatedAt: false,
            }
        );
    }
}

export default Contact;