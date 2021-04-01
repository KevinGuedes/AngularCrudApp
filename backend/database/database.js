const Database = require('sqlite-async')

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price DECIMAL(20,2),
            description TEXT,
            amount BIGINT
        );
    `)
}
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
