import SQLite from 'react-native-sqlite-2';
import { dbConfig } from '@utils/Constants';

const UserData = {
  id: '',
  nickname: '',
  userToken: '',
  createDate: new Date(),
  games: [],
  favContent: []
};

export default class User {
  constructor() {
    this.init();
  }

  async init() {
    this.db = await SQLite.openDatabase(dbConfig.name, dbConfig.version, dbConfig.description, dbConfig.size);
    this.table = 'User';
    this.db.transaction(function (txn) {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.table}
            (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            nickname VARCHAR(20), 
            userToken VARCHAR(36),
            createDate DATE)`,
        []
      );
    });
  }

  saveUser(user) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO ${this.table} (nickname, userToken, createDate) 
            VALUES (:nickname, :userToken, :createDate)`,
        [user.nickname, user.userToken, new Date()]
      );
    });
  }

  updateUserToken(id, userToken) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `UPDATE ${this.table} SET (userToken) 
        VALUES (:userToken) WHERE id=:id`,
        [userToken, id]
      );
    });
  }

  getUser(id) {
    this.db.transaction(function (txn) {
      txn.executeSql(`SELECT * FROM ${this.table} WHERE id=:id`, [id], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      });
    });
  }

  getUsers() {
    this.db.transaction(function (txn) {
      txn.executeSql(`SELECT * FROM ${this.table}`, [], function (tx, res) {
        for (let i = 0; i < res.rows.length; ++i) {
          console.log('item:', res.rows.item(i));
        }
      });
    });
  }

  deleteUser(userId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `DELETE FROM ${this.table} 
              WHERE id = :id`,
        [userId]
      );
    });
  }
}
