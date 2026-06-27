# Simple Real-Time Chat App

This is a beginner-friendly real-time chat application for a college assignment.
It uses Node.js, Express and Socket.io.

## Features
- Join a room with your name
- Send messages in real time
- See online users in a sidebar
- See typing indicator messages
- Receive system messages when users join or leave
- Leave room button
- Messages auto-scroll

## Project Files
- index.html - Main HTML structure
- style.css - Dark theme styling and responsive layout
- script.js - Frontend Socket.io logic
- server.js - Backend server and room logic
- package.json - Project dependencies

## Install and Run
1. Open the project folder in terminal.
2. Run this command:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Open your browser and visit:
   ```text
   http://localhost:3000
   ```

## How it Works
- The browser connects to the server using Socket.io.
- Users join a room with a name and room name.
- Messages are sent to everyone in the same room.
- The server updates the user list and sends typing notifications.

## Assignment Tip
You can explain this project as a simple example of real-time communication using WebSockets.
