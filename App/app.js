
const mysql = require('mysql')
const express = require('express');
const app = express()
const port  = 3000;

// create connection
var connection = mysql.createConnection({
    host     : 'congressdb.c7gkeec48xwe.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'ForTheClass',
    // port     : 3306, //this might need to be an integer double check
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

// render home page 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/forms.html');
});


// get info to create/insert new congress member to db (CREATE)
app.post('/add-congress-member', (req, res) => {
    const name = req.body.name;
    const party = req.body.party;
    const state = req.body.state;
    console.log(name);
    // now that we have user input build sql query and send it to db
        //  here .....
});

// endpoint to get congress member name to be searched for (READ)
app.post('/search-congress-member', (req, res) => {
    const name = req.body.name;
    console.log("got the name: ", name);

    // now that we have user input build sql query and send it to db
        //  here .....
})

// Endpoint to get new congressmember info to update (UPDATE)
app.post('/update-congress-member', (req, res) => {
    const memberID = req.body.id;
    const name = req.body.name
    const update = req.body.update
    const state = req.body.state


    console.log("got new congress member info: ");
    console.log(name);
    console.log(update);
    console.log(state);

    // now that we have user input build sql query and send it to db
        //  here .....
    })

// endpoint to get congress member id to delete (DELETE)
app.post('/delete-congress-member', (req, res) => {
const memberID = req.body.delete_id;
console.log("got the id: ", memberID);

// now that we have user input build sql query and send it to db
        //  here .....
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

connection.end();
