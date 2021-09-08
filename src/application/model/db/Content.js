import SQLite from 'react-native-sqlite-2';
import { dbConfig } from '@utils/Constants';

const ContentData = {
  id: '',
  apiId: '',
  type: '',
  createDate: new Date(),
  user: {}
};

export default class Content {
  constructor() {
    this.db = this.getDBInstance();
    this.table = 'Content';
    this.db.transaction(txn => {
      txn.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${this.table}'`,
        [],
        (_, results) => {
          if (results.rows._array.length <= 0) {
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS ${this.table}
                  (id INTEGER PRIMARY KEY NOT NULL, 
                  apiId INTEGER,
                  type INTEGER,
                  createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  userId INTEGER NOT NULL,
                  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
              [],
              () => {},
              (_, error) => console.error('ERROR CREATE TABLE Content', error)
            );
          }
        },
        (_, error) => {
          console.error('ERROR getTable', error);
          reject(error);
        }
      );
    });
  }

  getDBInstance() {
    return SQLite.openDatabase(dbConfig.name, dbConfig.version, dbConfig.description, dbConfig.size);
  }

  saveContent = (apiId, type, userId) =>
    new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO ${this.table} (apiId, type, userId)
            VALUES (:apiId, :type, :userId)`,
          [apiId, type, userId],
          (_, results) => resolve(results),
          (_, error) => reject(error)
        );
      });
    });

  getUserContent = userId =>
    new Promise((resolve, reject) => {
      this.db = this.getDBInstance();
      this.db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table} 
            WHERE userId=?`,
          [userId],
          (_, results) => {
            resolve(results.rows._array);
          },
          (_, error) => {
            console.error('ERROR getUserContent', error);
            reject(error);
          }
        );
      });
    });

  checkUserContentById = (apiId, userId) =>
    new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table} 
            WHERE apiId=? AND userId=?`,
          [apiId, userId],
          (_, results) => {
            resolve(results.rows._array);
          },
          (_, error) => {
            console.error('ERROR', error);
            reject(error);
          }
        );
      });
    });

  getContentByUserIdAndType = (userId, contentType) =>
    new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table} 
            WHERE userId=? AND type=?`,
          [userId, contentType],
          (_, results) => {
            resolve(results.rows._array);
          },
          (_, error) => {
            console.error('ERROR getContentByUserIdAndType', error);
            reject(error);
          }
        );
      });
    });

  deleteContent = (apiId, userId) =>
    new Promise((resolve, reject) => {
      this.db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${this.table} 
            WHERE apiId=? AND userId=?`,
          [apiId, userId],
          (_, results) => resolve(results),
          (_, error) => reject(error)
        );
      });
    });
}
