import express from 'express';
import routes from './routes/routes.js';
import database from './database/index.js';
import dotenv from 'dotenv';

class App {
  constructor() {
    dotenv.config();
    this.server = express();
    this.middlewares();
    this.routes();
    database.init();
  }

  middlewares() {
    // Middlewares
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }

  routes() {
    // Rotas
    this.server.use(routes);
  }
}

// Exporta o app
export default new App().server;