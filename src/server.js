const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const appRoutes = require('./routes/app.routes');
const { socketStreams } = require('./socket/streams.socket');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(appRoutes);

socketStreams(io);

module.exports = { server };