import { Router } from "express";
const routes = new Router();
import users from "../controllers/UsersController.js";
import sessions from "../controllers/SessionsController.js";
import auth from "../middlewares/auth.js";
import checkId from "../middlewares/checkId.js";
import contacts from "../controllers/ContactsController.js";

routes.post("/sessions", sessions.create);

routes.post("/users", users.create);

routes.post("/contacts", contacts.store);

routes.use(auth);

routes.get("/users/me", users.show);

routes.param("id", checkId);

routes.put("/users/:id", users.update);

routes.delete("/users/:id", users.destroy);

export default routes;
