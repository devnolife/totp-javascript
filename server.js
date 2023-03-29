const express = require('express');
const server = express();
const { getAll, getOne } = require('./service');
const { generateTOTP, validateTOTP } = require('./totp');

server.use(express.json());

const validator = (req, res, next) => {
    const { totp, secret } = req.headers;
    if (validateTOTP(secret, totp)) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

server.get('/all-mahasiswa', (req, res) => {
    try {
        const valid = validator(req);
        if (valid) {
            getAll(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

server.get('/mahasiswa/:nim', (req, res) => {
    try {
        const valid = validator(req);
        if (valid) {
            getOne(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

server.listen(8000, () => {
    console.log('Backend TOTP running on port 8000 by devnolife');
});