const databaseWrapper = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const { join } = require('path');

const { hashPassword, comparePasswords } = require('./hash-compare-passwords.js');

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
                        login VARCHAR(32) NOT NULL UNIQUE,
                        password TEXT NOT NULL
                    );    
                `);
                await this.#database.run(`
                    CREATE TABLE recent_cities (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        city_name VARCHAR(128) NOT NULL
                    );    
                `);

                await this.#database.run(`
                    CREATE TABLE archived_cities (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER NOT NULL,
                        city_name VARCHAR(128) NOT NULL
                    );    
                `);
            }

            this.#isInitialized = true;
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
        if (!this.#database) throw new Error(`База даних ще не ініціалізована`);

        await this.#database.close();
        this.#isInitialized = false;
        this.#database = null;
    }

    async addNewUser(user) {
        await this.awaitForDatabase();

        try {
            if (!this.#database) throw new Error(`База даних ще не ініціалізована`);

            const isThisUserExisting = await this.#database.get(`
                    SELECT * FROM users
                    WHERE login = ?;   
            `, [user.login]);

            if (isThisUserExisting) throw new Error('Під цим ім\'ям вже зареєстрований інший користувач');

            const hashedPassword = await hashPassword(user.password);

            await this.#database.run(`
                INSERT INTO users (login, password) VALUES (?, ?);    
            `, [user.login, hashedPassword]);

            return {message: 'Користувач успішно був зареєстрований'};
        } catch (error) {
            return {message: error.message};
        }
    }

    async getPeople() {
        await this.awaitForDatabase();

        try {
            if (!this.#database || !this.#isInitialized) 
                throw new Error(`База даних ще не ініціалізована`);

            const result =  await this.#database.all(`SELECT * FROM users;`);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }
}

// (async () => {
//     try {
//         const db = new SQLiteSystem();
//         await db.getPeople();
//         await db.closeDatabase();
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// })();

module.exports = { SQLiteSystem };