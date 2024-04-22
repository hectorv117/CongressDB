
const mysql = require('mysql')
const express = require('express');
const app = express()
const port  = 3000;
const bodyParser = require('body-parser');

// create connection
var connection = mysql.createConnection({
    host     : 'congressdb.c7gkeec48xwe.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'ForTheClass',
    port     : 3306, //this might need to be an integer double check
    database : 'Congress'
});


connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    
    console.log('Connected to database.');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
// render home page 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/forms.html');
});


// get info to create/insert new congress member to db (CREATE)
app.post('/add-congress-member', (req, res) => {
    const { memberid, name, party, state } = req.body;
    const sql = `INSERT INTO members (MEMBERID, NAME, PARTY, STATE) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [memberid, name, party, state], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User created:', result);
        res.status(200).json({ message: 'User created successfully' });
        connection.end();

    });
});

// endpoint to get congress member name to be searched for (READ)
app.post('/search-congress-member', (req, res) => {
    const { name } = req.body
    console.log("req.bodyyy: ", req.body); 
    const sql = `SELECT * FROM members WHERE NAME = ?`;
    connection.query(sql, [name], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Users fetched:', rows);
        res.status(200).json(rows);
        // updateSection(rows);
    });
})

// Endpoint to get new congressmember info to update (UPDATE)
app.post('/update-congress-member', (req, res) => {
    const userId = req.params.id;
    const { id, name, party, state } = req.body;
    const sql = `UPDATE members SET MEMBERID=?, NAME=?, PARTY=?, STATE=? WHERE MEMBERID=?`;
    connection.query(sql, [id, name, party, state, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User updated:', result);
        res.status(200).json({ message: 'User updated successfully' });
    });
    })

// endpoint to get congress member id to delete (DELETE)
app.post('/delete-congress-member', (req, res) => {
    const memberID = req.body.id;
    console.log("got the id: ", memberID);
// now that we have user input build sql query and send it to db
        //  here .....
    const sql = `DELETE FROM members WHERE MEMBERID = ?`
    connection.query(sql, [memberID], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('User deleted:', result);
        res.status(200).json({ message: 'User delete successfully' });
        connection.end();

    });

})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });


// query to get all congress members from members table
connection.query('SELECT * FROM members', (err, rows) => {
    if (err) {
        console.error('Error selecting records:', err);
        return;
    }
    console.log('Selected records:', rows);
});

