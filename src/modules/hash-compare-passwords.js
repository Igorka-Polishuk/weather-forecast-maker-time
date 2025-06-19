const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePasswords(password, passwordFromStorage) {
    return await bcrypt.compare(password, passwordFromStorage);
}

module.exports = { hashPassword, comparePasswords };