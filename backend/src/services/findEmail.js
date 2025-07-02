import User from "../models/User.js";

export default async function findEmail(email) {

        const data = await User.findOne({ where: { email } });

        if (!data) {
            return null
        }

        const user = data.toJSON();
        delete user.password;
        return user;

}

