import SQLite from 'react-native-sqlite-2';
import { dbConfig } from '@utils/Constants';

const GameData = {
  id: '',
  date: new Date(),
  user: {},
  maxRounds: 5,
  guessed: 0
};

export default class Game {
  constructor() {
    this.init();
  }

  async init() {
    this.db = await SQLite.openDatabase(dbConfig.name, dbConfig.version, dbConfig.description, dbConfig.size);
    this.table = 'Game';
    this.db.transaction(function (txn) {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.table}
            (id INTEGER PRIMARY KEY NOT NULL, 
                date DATE,
                maxRounds INTEGER, 
                guessedRounds INTEGER,
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
        []
      );
    });
  }

  saveGame(game, userId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO ${this.table} (date, maxRounds, guessedRounds, userId) 
            VALUES (:date, :maxRounds, :guessedRounds, :userId)`,
        [game.date, game.maxRounds, game.guessed, userId]
      );
    });
  }

  getGamesByUser(userId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM ${this.table} 
            WHERE userId = :userId`,
        [userId]
        // results.rows._array.forEach(row => console.log('item:', row));
      );
    });
  }

  deleteGame(gameId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `DELETE FROM ${this.table} 
              WHERE id = :id`,
        [gameId]
      );
    });
  }
}
