const express = require('express');
const server = express();
const { getAll, getOne } = require('./service');
const { validateTOTP } = require('./totp');
const cors = require('cors');
server.use(express.json());
server.use(cors());

const validator = (req) => {
    const { totp, secret } = req.headers;
    console.log(totp, 'totp', secret, 'secret');
    if (validateTOTP(secret, totp)) {
        return true;
    } else {
        return false;
    }
};

server.get('/all-mahasiswa', (req, res) => {
    try {
        const valid = validator(req);
        if (valid) {
            getAll(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized, User tidak mempunyai akses' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

server.get('/mahasiswa/:nim', (req, res) => {
    try {
        const valid = validator(req);
        if (valid) {
            getOne(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized, User tidak mempunyai akses' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

server.listen(8000, () => {
    console.log('Backend TOTP running on port 8000 by devnolife');
});
