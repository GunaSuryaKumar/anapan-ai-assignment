const sqlite3 = require('sqlite3').verbose();

// SQLite database connection
const db = new sqlite3.Database('C:/Users/kguna/Downloads/anapan-ai-assignment/server/data/competitors.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

module.exports = db;