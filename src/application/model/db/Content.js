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
    this.db.transaction(
      txn => {
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS ${this.table}
            (id INTEGER PRIMARY KEY NOT NULL, 
            apiId INTEGER,
            type VARCHAR(20),
            createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE)`,
          []
        );
      },
      err => console.log('error', err)
    );
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
      console.log('getUserContent INIT', userId);

      this.db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table} 
            WHERE userId=?`,
          [userId],
          (_, results) => {
            console.log('getUserContent result', results.rows._array);
            resolve(results.rows._array);
          },
          (_, error) => {
            console.log('ERROR', error);
            reject(error);
          }
        );
      });
    });

  checkUserContentById = (apiId, userId) =>
    new Promise((resolve, reject) => {
      console.log('checkUserContentById INIT', apiId, userId);

      this.db.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${this.table} 
            WHERE apiId=? AND userId=?`,
          [apiId, userId],
          (_, results) => {
            console.log('checkUserContentById result', results.rows._array);
            resolve(results.rows._array);
          },
          (_, error) => {
            console.log('ERROR', error);
            reject(error);
          }
        );
      });
    });

  deleteContent = (apiId, userId) =>
    new Promise((resolve, reject) => {
      console.log('deleteContent', apiId, userId);

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
