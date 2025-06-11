import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
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
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "users",
            }
        );

        this.addHook("beforeSave", async (user) => {
            if (user.changed("password")) {
                user.password = await bcrypt.hash(user.password, 8);
            }
        });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }

}

export default User;