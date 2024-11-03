const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Store messages temporarily in a JSON file
const messagesFilePath = path.join(__dirname, 'messages.json');

// Load existing messages
let messages = [];
if (fs.existsSync(messagesFilePath)) {
    const data = fs.readFileSync(messagesFilePath);
    messages = JSON.parse(data);
}

// Get messages
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Post a new message
app.post('/messages', (req, res) => {
    const { username, content } = req.body;
    const newMessage = { username, content, timestamp: new Date() };
    messages.push(newMessage);
    
    // Save messages to JSON file
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    res.status(201).json(newMessage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
