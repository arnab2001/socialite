// import express from 'express';
// const router = express.Router();

// // Route to check if the chat server is up and running
// router.get('/test', (req, res) => {
//   res.status(200).json({ message: 'Chat server is up and running!' });
// });

// // Endpoint to join the chat
// router.post('/join', (req, res) => {
//   const { username } = req.body;
//   // Emit a 'join_chat' event to notify the server that a user has joined
//   io.emit('join_chat', username);
//   res.status(200).json({ message: `User ${username} joined the chat!` });
// });

// // Endpoint to send a private message
// router.post('/send-message', (req, res) => {
//   const { sender, recipient, message } = req.body;
//   // Emit a 'private_message' event to send a private message
//   io.emit('private_message', { sender, recipient, message });
//   res.status(200).json({ message: 'Message sent successfully!' });
// });

// export default router;