const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Setup MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'multilingual_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Endpoint to fetch texts by language
app.get('/texts/:language', (req, res) => {
    const language = req.params.language;
    const query = 'SELECT content FROM texts WHERE language = ?';
    connection.query(query, [language], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json({
            message: req.t('fetchSuccess'),
            data: results
        });
    });
});

// Endpoint to save new text
app.post('/texts', (req, res) => {
    const { language, content } = req.body;
    const query = 'INSERT INTO texts (language, content) VALUES (?, ?)';
    connection.query(query, [language, content], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json({
            message: req.t('saveSuccess'),
            id: results.insertId,
            language,
            content
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
