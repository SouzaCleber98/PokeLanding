const SQLite = require('sqlite3');
require('dotenv').config();

module.exports = {
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
};
