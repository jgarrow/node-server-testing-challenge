const express = require('express');

const MyDatabase = require('../data/dbModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    MyDatabase.getAllUsers()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({ message: `Error fetching users` });
        });
});

server.post('/', (req, res) => {
    MyDatabase.addUser(req.body)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) =>
            res.status(500).json({ message: `Error adding new user` })
        );
});

server.delete('/:id', (req, res) => {
    const userId = req.params.id;

    MyDatabase.deleteUser(userId)
        .then((response) => {
            console.log('response: ', response);
            if (response > 0) {
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: `No user by id ${userId}` });
            }
        })
        .catch((err) =>
            res.status(500).json({ message: `Error deleting user` })
        );
});

module.exports = server;
