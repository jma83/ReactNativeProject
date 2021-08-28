import SQLite from 'react-native-sqlite-2';
import { dbConfig } from '@utils/Constants';

const ContentData = {
  id: '',
  apiId: '',
  type: '',
  createDate: new Date(),
  user: {}
};

export default class User {
  constructor() {
    this.init();
  }

  async init() {
    this.db = await SQLite.openDatabase(dbConfig.name, dbConfig.version, dbConfig.description, dbConfig.size);
    this.table = 'Content';
    this.db.transaction(function (txn) {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.table}
            (id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT, 
            apiId INTEGER,
            type ENUM('CHARACTER', 'CATEGORY', 'LOCATION') NOT NULL,
            createDate DATE,
            FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE))`,
        []
      );
    });
  }

  saveContent(content, userId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO ${this.table} (apiId, type, createDate, userId)
            VALUES (:apiId, :type, :createDate, :userId)`,
        [content.apiId, content.type, new Date(), userId]
      );
    });
  }

  getContentByUser(userId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `SELECT * FROM ${this.table} 
            WHERE userId=:userId`,
        [userId],
        function (tx, res) {
          for (let i = 0; i < res.rows.length; ++i) {
            console.log('item:', res.rows.item(i));
          }
        }
      );
    });
  }

  deleteContent(contentId) {
    this.db.transaction(function (txn) {
      txn.executeSql(
        `DELETE FROM ${this.table} 
              WHERE id=:id`,
        [contentId]
      );
    });
  }
}
