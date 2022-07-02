function send_message(){
    const messageInput = document.getElementById('messageInput');
    
    if (messageInput.value !== '') {
        let newMessage = messageInput.value;

        socket.emit('new-message', {
            user   : socket.id,
            message: newMessage,
        }); 

        addMessage({ message: newMessage }, true)
        
        messageInput.value = ''
    } else {
        // adds error styling to input
        messageInput.classList.add('error')
    }
}