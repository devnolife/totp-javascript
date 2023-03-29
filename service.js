const con = require('./db');
const getAll = (req, res) => {
    con.query('SELECT * FROM mahasiswa', (err, result) => {
        if (err) res.status(500).json({ message: 'Internal Server Error' });
        res.json(result);
    });
};

const getOne = (req, res) => {
    con.query('SELECT * FROM mahasiswa WHERE nim = ?', [req.params.nim], (err, result) => {
        if (err) res.status(500).json({ message: 'Internal Server Error' });
        res.json(result);
    });
};

module.exports = { getAll, getOne };