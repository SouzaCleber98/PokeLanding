import express from 'express';
import routes from './routes/routes.js';
import database from './database/index.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configuração do caminho para o diretório atual
const __dirname = dirname(fileURLToPath(import.meta.url));

class App {
  constructor() {
    dotenv.config();
    this.server = express();
    this.config();
    this.middlewares();
    this.routes();

    database.init();
  }

  config() {
    // Configurações
    this.server.set('views', path.join(__dirname, '..', '..', 'frontend', 'views'));
    this.server.set('view engine', 'ejs');
    this.server.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));
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