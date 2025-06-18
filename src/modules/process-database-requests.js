const databaseWrapper = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { join } = require('path');

const DATABASE_PATH = join(__dirname, '../', '../', 'database.db');

class SQLiteSystem {
    #database;

    constructor() {
        this.#initializeDatabase();
    }

    async #initializeDatabase() {
        try {
            this.#database = await databaseWrapper
            .open({
                filename: DATABASE_PATH,
                driver: sqlite3.Database
            });

            const isDatabaseExisting = await this.#database.get(`
                SELECT name FROM sqlite_master
                WHERE type='table' AND name='users';    
            `);

            if (!isDatabaseExisting) {
                await this.#database.run(`
                    CREATE TABLE users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        login VARCHAR(32) NOT NULL UNIQUE
                    );    
                `);
                await this.#database.run(`
                    CREATE TABLE cities (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        city_name VARCHAR(128) NOT NULL,

                        FOREIGN KEY (user_id) REFERENCES users(login)
                    );    
                `);
            }
        } catch (error) {
            if (!this.#database) throw error;
            console.error(`Error: ${error.message}`);
            await this.#database.close();
        }
    }

    async getPeople() {
        if (!this.#database) throw new Error(`Database is not initialized yet...`);

        return await this.#database.all(`SELECT * FROM users;`);
    }
}

// (async () => {
//     try {
//         const db = new SQLiteSystem();
//         await new Promise((resolve, reject) => { setTimeout(resolve, 1000) });
//         const result = await db.getPeople();
//         console.log(result);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// })();

export { SQLiteSystem };