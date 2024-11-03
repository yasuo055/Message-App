document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messagesContainer = document.getElementById('messages');

    // Function to fetch messages from the server
    function fetchMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(messages => {
                messagesContainer.innerHTML = '';
                messages.forEach(message => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    messageElement.textContent = `${message.username}: ${message.content}`;
                    messagesContainer.appendChild(messageElement);
                });
            });
    }

    // Handle form submission
    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const content = document.getElementById('content').value;

        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, content }),
        })
        .then(response => response.json())
        .then(() => {
            fetchMessages();
            messageForm.reset();
        });
    });

    // Fetch messages every second
    setInterval(fetchMessages, 1000);
    fetchMessages(); // Initial fetch
});
