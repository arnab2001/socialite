import Message from "./../models/Message.js";
const activeUsers = new Map();
const chatHistoryCache = new Map();

let ioInstance;

export const setIoInstance = (io) => {
  ioInstance = io;
};

export const handleChatConnection = (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("join_chat", async ({ userId }) => {
    socket.join(userId);

    // Check cache first
    const cachedHistory = chatHistoryCache.get(userId);

    if (cachedHistory) {
      socket.emit("chat_history", cachedHistory);
    } else {
      const chatHistory = await Message.find({
        $or: [{ senderId: userId }, { recipientId: userId }],
      }).sort({ createdAt: "asc" });

      socket.emit("chat_history", chatHistory);
      chatHistoryCache.set(userId, chatHistory);
    }

    activeUsers.set(socket.id, { userId, socket });
    // Use ioInstance here instead of io
    ioInstance.emit(
      "active_users",
      [...activeUsers.values()].map((user) => user.userId)
    );
  });

  socket.on("send_message", async ({ senderId, recipientId, message }) => {
    try {
      const newMessage = await Message.create({
        senderId,
        recipientId,
        message,
      });
      const recipientSocket = [...activeUsers.values()].find(
        (user) => user.userId === recipientId
      )?.socket;

      if (recipientSocket) {
        recipientSocket.emit("receive_message", {
          senderId,
          message: newMessage.message,
          createdAt: newMessage.createdAt,
        });
      }
    } catch (error) {
      console.error("Error creating message:", error);
 
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    activeUsers.delete(socket.id);

    ioInstance.emit(
      "active_users",
      [...activeUsers.values()].map((user) => user.userId)
    );
  });
};

// join_chat:
// Send a message with the event name join_chat.
// Include a JSON payload with the userId you want to join as.
// send_message:
// Send a message with the event name send_message.
// Include a JSON payload with senderId, recipientId, and message properties.
// Observe responses:

// Monitor the Server Response section for emitted events and data:
// chat_history: Contains the chat history for the joined user.
// active_users: Contains the list of currently active users.
// receive_message: Contains the received message data.
