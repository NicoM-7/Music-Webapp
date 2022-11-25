import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lab4db',
    multipleStatements: true
});

// Builds Lists table
function buildPlaylistsDB() {
    // Deletes the table if one already exists
    db.query("DROP TABLE playlists;", (err) => {
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
        `CREATE TABLE playlists (
        name varchar(100) NOT NULL,
        user varchar(100) NOT NULL,
        description text,
        public tinyint DEFAULT '0',
        numTracks int DEFAULT NULL,
        playtime varchar(20) DEFAULT NULL,
        rating double DEFAULT NULL,
        lastModified varchar(20) DEFAULT NULL,
        tracks text,
        PRIMARY KEY (name, user)
        ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
        (err) => {
            if (err) {
                throw err;
            }
            console.log("Playlists Table Created");
        }
    );
}

// =========================================================================================

buildPlaylistsDB();
