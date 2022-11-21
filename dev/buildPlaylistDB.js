import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lab4db',
    multipleStatements: true
});

// Builds Lists table
function buildListsDB() {
    // Deletes the table if one already exists
    db.query("DROP TABLE lists;", (err) => {
        if (err) {
            console.log("No Table to drop");
        }
        else {
            console.log("Dropped Table");
        }
    }
    );

    // Creates new table
    db.query(
        `CREATE TABLE lists (
        listName VARCHAR(150) NOT NULL,
        numTracks int DEFAULT NULL,
        totalDuration VARCHAR(6) DEFAULT NULL,
        PRIMARY KEY (listName)
        ) DEFAULT CHARSET=utf8mb4;`, (err) => {
        if (err) {
            throw err;
        }
        console.log("Lists Table Created");
    }
    );
}

// Build List Track DB table
function buildListTrackDetailsDB() {
    // Deletes the table if one already exists
    db.query("DROP TABLE listTrackDetails;", (err) => {
        if (err) {
            console.log("No Table to drop");
        }
        else {
            console.log("Dropped Table");
        }
    }
    );

    // Creates new table
    db.query(
        `CREATE TABLE listTrackDetails (
        listName VARCHAR(255) NOT NULL,
        trackID int NOT NULL
        ) DEFAULT CHARSET=utf8mb4;`, (err) => {
        if (err) {
            throw err;
        }
        console.log("List Track Details Table Created");
    }
    );
}

// =========================================================================================

buildListsDB();
buildListTrackDetailsDB();