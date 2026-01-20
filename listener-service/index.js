require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');


const startTcpListener = require('./tcpListener');


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));


startTcpListener(io);


server.listen(process.env.PORT, () => console.log(`Listener API on ${process.env.PORT}`));