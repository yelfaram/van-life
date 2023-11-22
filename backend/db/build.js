import fs from 'fs';
import connection from './connection.js';

//Read file and parse it to string
const sqlQuery = fs.readFileSync('./db/build.sql', 'utf-8');

// Execute query
connection.query(sqlQuery, err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database built successfully');

    // End connection
    connection.end();
});
  
