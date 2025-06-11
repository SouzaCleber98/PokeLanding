import models from "../models/index.js";
import Sequelize from "sequelize";
import config from "../config/database.cjs";


class Database {

    constructor() {
        this.connection = new Sequelize(config);
    }

    init() {
        models.forEach(model => {
            model.init(this.connection);
        });
    }
}

export default new Database();