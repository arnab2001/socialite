// ChatComponent.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; // Import Socket.IO

const socket = io('http://localhost:3001'); // Connect to the Socket.IO server

const ChatComponent = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    // Event listener for incoming messages
    socket.on('message', (message) => {
      setChatLog((prevChatLog) => [...prevChatLog, message]);
    });

    // Fetch initial chat log or do any setup
  }, []);

  const joinChat = () => {
    try {
      socket.emit('join_chat', { username });
    } catch (error) {
      console.error('Error joining chat:', error);
    }
  };

  const sendMessage = () => {
    try {
      socket.emit('send_message', {
        sender: username,
        recipient: 'RecipientUsername', // Replace with the recipient's username
        message,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={joinChat}>Join Chat</button>
      </div>
      <div>
        <ul>
          {chatLog.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Message:</label>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatComponent;
