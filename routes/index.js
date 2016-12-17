var express = require('express');
var router = express.Router()
var pg = require('pg');
var path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://tawanda:serverside@localhost:5432/mac_world';

var app = express();

/* GET home page. */

router.get('/tawanda', function (req, res) {
  res.render('tawa', {heading: 'Tawanda'});
})

router.use('/admin/insert', (req, res, next) => {
    const results = [];
// Grab data from http request
const data = {name: req.body.name, message: req.body.text,email: req.body.email,contact: req.body.contact, complete: false};
    console.log(data);
// Get a Postgres client from the connection pool
pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO jobs( message, cus_email, cus_contact, complete, cus_name) values($1, $2, $3, $4, $5)',
    [data.message,data.email, data.contact, data.complete, data.name]);
// SQL Query > Select Data
const query = client.query('SELECT * FROM jobs ORDER BY id ASC');
// Stream results back one row at a time
query.on('row', (row) => {
    results.push(row);
});
// After all data is returned, close connection and return results
query.on('end', () => {
    done();
return res.json(results);
});
});
});
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    nebody
});
router.use('/admin/jobs', (req, res, next) => {
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM jobs ORDER BY id ASC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.use('/admin/update/:job_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.job_id;
    console.log(id);
    // Grab data from http request
    const data = {message: req.query.text, complete: true};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Update Data
        client.query('UPDATE jobs SET complete=($1) WHERE id=($2)',
            [ data.complete, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM jobs ORDER BY id ASC");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

router.use('/admin/delete/:job_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.job_id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Delete Data
        client.query('DELETE FROM jobs WHERE id=($1)', [id]);
        // SQL Query > Select Data
        var query = client.query('SELECT * FROM jobs ORDER BY id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});





module.exports = router;
