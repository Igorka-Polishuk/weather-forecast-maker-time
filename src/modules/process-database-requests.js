const databaseWrapper = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const { join } = require('path');

const DATABASE_PATH = join(__dirname, '../', '../', 'database.db');

class SQLiteSystem {
    #database;
    #isInitialized = false;

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
                    CREATE TABLE recent_cities (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        city_name VARCHAR(128) NOT NULL,

                        FOREIGN KEY (user_id) REFERENCES users(id)
                    );    
                `);

                await this.#database.run(`
                    CREATE TABLE archived_cities (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        city_name VARCHAR(128) NOT NULL

                        FOREIGN KEY (user_id) REFERENCES users(id);
                    );    
                `);

                this.#isInitialized = true;
            }
        } catch (error) {
            if (!this.#database) throw error;
            console.error(`Error: ${error.message}`);
            await this.#database.close();
            this.#isInitialized = false;
        }
    }

    async awaitForDatabase() {
        while (!this.#isInitialized) {
            await new Promise((resolve, reject) => { setTimeout(resolve, 10); });
        }

        return;
    }

    async closeDatabase() {
        if (!this.#database) throw new Error(`Database is not initialized yet...`);

        await this.#database.close();
    }

    async getPeople() {
        if (!this.#database) throw new Error(`Database is not initialized yet...`);

        return await this.#database.all(`SELECT * FROM users;`);
    }

    async addNewUser(login) {
        try {
            if (!this.#database) throw new Error(`Database is not initialized yet...`);

            const isThisUserExisting = await this.#database.get(`
                    SELECT * FROM users
                    WHERE login = ?;   
            `, [login]);

            if (isThisUserExisting) throw new Error('This user have already existed...');

            await this.#database.run(`
                INSERT INTO users (login) VALUES (?);    
            `, [login]);
        } catch (error) {
            throw new Error(error.message);
        }
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

module.exports = { SQLiteSystem };