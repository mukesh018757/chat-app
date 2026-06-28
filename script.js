// This file handles the client-side chat logic.
// It connects to the Socket.io server and updates the UI.

const socket = io("https://chat-app-kh4w.onrender.com");

const joinScreen = document.getElementById('joinScreen');
const chatScreen = document.getElementById('chatScreen');
const nameInput = document.getElementById('nameInput');
const roomInput = document.getElementById('roomInput');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesBox = document.getElementById('messages');
const userList = document.getElementById('userList');
const roomTitle = document.getElementById('roomTitle');
const userTitle = document.getElementById('userTitle');
const typingIndicator = document.getElementById('typingIndicator');

let currentRoom = '';
let currentName = '';
let typingTimer;

// Ensure chat screen is hidden until the user joins.
chatScreen.classList.add('hidden');
joinScreen.classList.remove('hidden');

// Show the chat screen after joining a room.
function showChatScreen() {
  joinScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  chatScreen.style.display = '';
}

// Show the join screen again after leaving.
function showJoinScreen() {
  chatScreen.classList.add('hidden');
  joinScreen.classList.remove('hidden');
  messageInput.value = '';
  messagesBox.innerHTML = '';
  userList.innerHTML = '';
  typingIndicator.textContent = '';
  currentRoom = '';
  currentName = '';
}

// Add a message to the message box.
function addMessage(message, isSystem = false) {
  const messageItem = document.createElement('div');
  messageItem.className = isSystem ? 'system-message' : 'message';

  if (isSystem) {
    messageItem.textContent = message;
  } else {
    messageItem.innerHTML = `<span class="sender">${message.sender}</span><span class="time">${message.time}</span><div>${message.text}</div>`;
  }

  messagesBox.appendChild(messageItem);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Update the online users list.
function updateUserList(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const item = document.createElement('li');
    item.textContent = user.name;
    userList.appendChild(item);
  });
}

// Join button click event.
joinButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const room = roomInput.value.trim();

  if (!name || !room) {
    alert('Please enter both name and room.');
    return;
  }

  currentName = name;
  currentRoom = room;
  joinButton.disabled = true;
  joinButton.textContent = 'Joining...';

  socket.emit('join-room', { name, room });
});

// Send message form.
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!currentRoom) {
    return;
  }

  const message = messageInput.value.trim();
  if (!message) {
    return;
  }

  socket.emit('send-message', { room: currentRoom, message, name: currentName });
  messageInput.value = '';
  socket.emit('stop-typing', { room: currentRoom, name: currentName });
});

// Show typing indicator while user is typing.
messageInput.addEventListener('input', () => {
  if (!currentRoom) {
    return;
  }

  socket.emit('typing', { room: currentRoom, name: currentName });

  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.emit('stop-typing', { room: currentRoom, name: currentName });
  }, 1000);
});

// Leave room button.
leaveButton.addEventListener('click', () => {
  if (!currentRoom) {
    return;
  }

  socket.emit('leave-room', { room: currentRoom, name: currentName });
  currentRoom = '';
  showJoinScreen();
});

// Receive messages from server.
socket.on('receive-message', (message) => {
  addMessage(message);
});

// Receive system messages.
socket.on('system-message', (data) => {
  addMessage(data.text, true);
});

// Receive updated user list.
socket.on('room-users', (users) => {
  updateUserList(users);
});

// Show typing message from another user.
socket.on('typing', (data) => {
  typingIndicator.textContent = `${data.name} is typing...`;
});

// Clear typing message.
socket.on('stop-typing', () => {
  typingIndicator.textContent = '';
});

// Server error for room actions.
socket.on('room-error', ({ message }) => {
  alert(message);
  currentRoom = '';
  joinButton.disabled = false;
  joinButton.textContent = 'Join Room';
});

// Let the server confirm that the room was joined.
socket.on('joined-room', ({ room, name }) => {
  roomTitle.textContent = room;
  userTitle.textContent = `Hello, ${name}`;
  showChatScreen();
  joinButton.disabled = false;
  joinButton.textContent = 'Join Room';
  addMessage({ sender: 'System', text: `You joined ${room} as ${name}`, time: '' }, true);
});
