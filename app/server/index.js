require("dotenv").config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.static('public'));

// To save the list of users as id:username
let users = {}

io.on('connection', (socket) => {
    console.log('👾 New socket connected! >>', socket.id);

    // Handles new connection.
    socket.on('data_user', function (data) {
        const userName = data.username;

        console.log(`Username: ${userName}`);

        users[socket.id] = userName;
        console.log('users :>>', users);

        io.emit('welcome-message', {
            user: 'server',
            message: `Welcome to Proyectos Beta - chat ${userName}. There are ${Object.keys(users).length
                } users connected`,
        });
    });

    // Handles message posted by client
    socket.on('new-message', function (data) {
        const user = data.user;
        const message = data.message;
        console.log(`👾 new-message from ${user}`);

        socket.broadcast.emit('broadcast-message', {
            user: users[user],
            message: message,
        });
    });

    socket.on('typing', (data) => {
        const user = data.user;
        const typing = data.typing;
        const message = `${user} is typing...`;

        console.log(`👾 ${message}`);

        io.emit('typing-message', {
            user: 'server',
            typing: typing,
            message: message,
        });
    });

    socket.on('disconnect', () => {
        const userName = users[socket.id];
        const prop = socket.id;

        console.log(`user disconnected :>> ${userName}`);

        delete users[prop];

        io.emit('chat message', {
            user: 'server',
            message: `${userName} left the chat. There are ${Object.keys(users).length
                } users connected`,
        });
    });
});

server.listen(APP_PORT, () => {
    console.log(`Listening on *: ${APP_PORT}`);
});