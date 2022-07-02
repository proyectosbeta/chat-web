const socket = io();
const form = document.getElementById('messageForm');
const input = document.getElementById('messageInput');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (input.value) {
    send_message();
    input.value = '';
  }
});

// Prompt to ask user's name.
const username = prompt('Welcome! Please enter your name:');

socket.emit('data_user', {
  username
});

socket.on('welcome-message', function (data) {
  console.log('received welcome-message >>', data);

  addMessage(data, false);
});

socket.on('broadcast-message', function (data) {
  console.log('📢 broadcast-message event >> ', data);

  addMessage(data, false);
});

socket.on('chat message', function (data) {
  console.log('disconnect user >>', data);

  addMessage(data, false);
});

// Receives two params, the message
// and if it was sent by yourself
// so we can style them differently.
function addMessage(data, isSelf = false) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('message')

  if (isSelf) {
    messageElement.classList.add('self-message')
    messageElement.innerText = `${data.message}`
  } else {
    if (data.user === 'server') {
      // Message is from the server,
      // like a notification of
      // new user connected
      // messageElement.classList.add('others-message')
      messageElement.innerText = `${data.message}`
    } else {
      // Message is from other user
      messageElement.classList.add('others-message');
      messageElement.innerText = `${data.user}: ${data.message}`;
    }
  }

  const chatContainer = document.getElementById('chatContainer');

  chatContainer.append(messageElement);
}