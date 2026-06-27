// Main server file.
// This file starts the Express server and creates the Socket.io connection.

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the project folder.
app.use(express.static(path.join(__dirname)));

// Keep a list of users in each room.
const roomUsers = {};

// When a client connects, listen for chat events.
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When a user joins a room.
  socket.on('join-room', ({ name, room }) => {
    socket.join(room);

    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }

    roomUsers[room] = roomUsers[room].filter((user) => user.id !== socket.id);
    roomUsers[room].push({ id: socket.id, name });

    socket.emit('joined-room', { room, name });
    io.to(room).emit('system-message', { text: `${name} joined the room.` });
    io.to(room).emit('room-users', roomUsers[room]);
  });

  // When a user leaves a room.
  socket.on('leave-room', ({ room, name }) => {
    if (roomUsers[room]) {
      roomUsers[room] = roomUsers[room].filter((user) => user.id !== socket.id);
      io.to(room).emit('room-users', roomUsers[room]);

      // Tell other users that this person left.
      io.to(room).emit('system-message', {
        text: `${name} left the room.`
      });
    }

    socket.leave(room);
  });

  // When a user sends a chat message.
  socket.on('send-message', ({ room, message, name }) => {
    const chatMessage = {
      sender: name,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    io.to(room).emit('receive-message', chatMessage);
  });

  // When a user starts typing.
  socket.on('typing', ({ room, name }) => {
    socket.to(room).emit('typing', { name });
  });

  // When a user stops typing.
  socket.on('stop-typing', ({ room, name }) => {
    socket.to(room).emit('stop-typing', { name });
  });

  // When a user disconnects, remove them from all rooms.
  socket.on('disconnect', () => {
    for (const room in roomUsers) {
      roomUsers[room] = roomUsers[room].filter((user) => user.id !== socket.id);
      io.to(room).emit('room-users', roomUsers[room]);
    }
  });
});

// Start the server on port 3000.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
