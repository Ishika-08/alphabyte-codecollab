const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./Actions');

const server = http.createServer(app);
const io = new Server(server);

// Map to store username by socketId
const userSocketMap = {};

// Function to get all connected clients in a room
function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

// Event listener for connection
io.on('connection', (socket) => {
    // Event listener for JOIN action
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        io.to(roomId).emit(ACTIONS.JOINED, {
            clients,
            username,
            socketId: socket.id,
            code: "", // Initialize code as an empty string when a new user joins
        });
    });

    // Handle ICE candidates
    socket.on('iceCandidate', ({ from, to, iceCandidate }) => {
        io.to(to).emit('iceCandidate', { from, iceCandidate });
    });

    // Handle SDP exchange
    socket.on('sdpOffer', ({ from, to, offer }) => {
        io.to(to).emit('sdpOffer', { from, offer });
    });

    socket.on('sdpAnswer', ({ from, to, answer }) => {
        io.to(to).emit('sdpAnswer', { from, answer });
    });

    // Event listener for CODE_CHANGE action
    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        console.log('Received code change', code);
        io.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    // Event listener for NEW_STREAM action
    // Event listener for NEW_STREAM action
    socket.on(ACTIONS.NEW_STREAM, ({ roomId, stream }) => {
        console.log('Received new stream', stream);
        
        console.log(roomId)
        if (stream) {
            // Check if the socket is in the room before broadcasting
            if (io.sockets.adapter.rooms.has(roomId)) {

                // Emit to all sockets in the room except the current one
                socket.to(roomId).emit(ACTIONS.NEW_STREAM, { stream });
            } else {
                console.error('Room does not exist:', roomId);
            }
        } else {
            console.error('Invalid stream object received:', stream);
        }
    });

    // Event listener for disconnecting
    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            io.to(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
