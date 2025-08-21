import User from "../models/User.js";

export default async function findEmail(email) {

        const getUserData = await User.findOne({ where: { email } });

        if (!getUserData) {
            return null
        }

        const userDataJSON = getUserData.toJSON();
        delete userDataJSON.password;
        return userDataJSON;

}

