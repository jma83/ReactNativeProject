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
    const db = this.getDBInstance();
    this.table = 'User';
    console.log('created table User!');

    db.transaction(
      txn => {
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS ${this.table}
              (id INTEGER PRIMARY KEY NOT NULL, 
              nickname VARCHAR(20), 
              avatar BLOB, 
              userToken VARCHAR(36),
              createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
          []
        );
      },
      err => console.log('error', err)
    );
  }

  getDBInstance() {
    return SQLite.openDatabase(dbConfig.name, dbConfig.version, dbConfig.description, dbConfig.size);
  }

  saveUser = (user, userToken) =>
    new Promise((resolve, reject) => {
      const db = this.getDBInstance();

      db.transaction(
        txn => {
          txn.executeSql(
            `INSERT INTO ${this.table} (nickname, avatar, userToken) 
                VALUES (:nickname, :avatar, :userToken)`,
            [user.nickname, user.image, userToken],
            (tx, results) => resolve(results),
            (tx, error) => reject(error)
          );
        },
        err => console.log('error', err)
      );
    });

  updateUserToken = (id, userToken) =>
    new Promise((resolve, reject) => {
      const db = this.getDBInstance();
      console.log('updateUserToken', userToken);
      console.log('id', id);
      db.transaction(txn => {
        txn.executeSql(
          `UPDATE ${this.table} SET userToken=? WHERE id=?`,
          [userToken, id],
          (tx, results) => resolve(results),
          (tx, error) => reject(error)
        );
      });
    });

  checkUser = (nickname, userToken) =>
    new Promise((resolve, reject) => {
      const db = this.getDBInstance();
      console.log('checkUser INIT', nickname, userToken);

      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table}
            WHERE nickname = ? AND userToken = ?`,
          [nickname, userToken],
          (tx, results) => {
            console.log('checkUser result', results.rows._array);
            resolve(results.rows._array);
          },
          (tx, error) => {
            console.log('ERROR', error);
            reject(error);
          }
        );
      });
    });

  getUsers = () =>
    new Promise((resolve, reject) => {
      const db = this.getDBInstance();
      db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table}`,
          [],
          (tx, results) => {
            console.log('getUsers result', results.rows._array);
            // results.rows._array.forEach(row => console.log('item:', row));
            resolve(results.rows._array);
          },
          (tx, error) => {
            console.log('ERROR', error);
            reject(error);
          }
        );
      });
    });

  deleteUser = id =>
    new Promise((resolve, reject) => {
      const db = this.getDBInstance();
      console.log('userId', id);
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${this.table}
          WHERE id = ?`,
          [id],
          (tx, results) => {
            console.log('deleteUser result', results);
            // results.rows._array.forEach(row => console.log('item:', row));
            resolve(true);
          },
          (tx, error) => {
            console.log('ERROR deleteUser', error);
            reject(error);
          }
        );
      });
    });
}
