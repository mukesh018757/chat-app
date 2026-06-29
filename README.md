# Real-Time Chat Application

**Company Name:** CODTECH IT Solutions  

**Intern Name:** MUKESH KUMAR 

**Intern ID:** CTIS9298

**Domain:** Web Development  

**Batch Duration:** 8 WEEK 

**Mentor Name:** Nila Santos  

---


## 🌐 Live Demo
https://chat-app-kh4w.onrender.com

## Project Description

This project is a Real-Time Chat Application developed 
as part of my internship at CODTECH IT Solutions. 
The application allows multiple users to communicate 
with each other instantly without refreshing the page, 
using WebSocket technology through the Socket.io library.

### Tools and Technologies Used

The entire project was developed using Visual Studio Code 
(VS Code) as the primary code editor. The frontend of the 
application is built using HTML, CSS, and plain JavaScript 
without any frontend framework. The backend is powered by 
Node.js and Express.js which handles the server-side logic 
and routing. For real-time bidirectional communication 
between the client and server, Socket.io library has been 
used which works on top of WebSocket protocol.

### How the Application Works

When a user opens the application, they are presented with 
a join screen where they enter their name and a room name. 
Once they click the Join button, a WebSocket connection is 
established between the user's browser and the Node.js 
server using Socket.io. The server places the user into a 
specific room based on the room name they entered.

When any user types a message and clicks Send, the message 
is first sent to the server via the socket connection. The 
server then broadcasts this message to all other users who 
are currently in the same room. This entire process happens 
in milliseconds, making the chat feel truly real-time.

The application also includes a typing indicator feature. 
When a user is typing, a "xyz is typing..." message appears 
for all other users in the room. This is also handled 
through Socket.io events. When a user joins or leaves a 
room, a system message is displayed to all members of that 
room notifying them about the event.

The online users list on the left sidebar gets updated 
automatically whenever someone joins or leaves the room. 
The server maintains a list of all active users in each 
room and sends this updated list to all connected clients 
whenever there is a change.

### Where This Project is Applicable

Real-time chat applications like this one have a very wide 
range of practical use cases in the real world. This type 
of application can be used in customer support systems 
where agents need to chat with customers instantly. It can 
be used in team collaboration tools similar to Slack or 
Microsoft Teams where team members communicate in different 
channels or rooms.

Educational platforms can use this technology to enable 
live discussion between students and teachers during online 
classes. Gaming platforms use real-time chat for players 
to communicate during multiplayer games. Healthcare 
platforms can use it for instant communication between 
doctors and patients. Event platforms use it for live 
Q&A sessions during webinars and conferences.

The WebSocket technology used in this project is also the 
foundation of many modern applications like live sports 
score updates, stock market price tracking, real-time 
location tracking in food delivery apps, and collaborative 
document editing tools like Google Docs.

This project demonstrates a strong understanding of 
full-stack web development, real-time communication 
protocols, event-driven programming in Node.js, and 
building interactive user interfaces using vanilla 
JavaScript. It also covers important concepts like 
Socket.io rooms, event emitting and listening, and 
managing connected users on the server side.

---

## Output
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/adbf18b9-5cee-4ecb-8793-d6cda4110f28" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/71af7ceb-5a89-4475-a8b7-522b0d46c298" />
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/a797a7e5-8ca5-4942-a79b-c03e5cf4115e" />
