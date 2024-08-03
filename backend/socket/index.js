import express from "express";
import { Server } from "socket.io";
import http from "http";
import { getUserDetailsByToken } from "../helper/getUserDetailsByToken.js";
import userModel from "../models/UserModel.js";
import ConversationModel from "../models/Conversation.model.js";
import MessageModel from "../models/MessageModel.js";

export const app = express();

// socket connection

export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// to show online or not
const onlineUsers = new Set();

io.on("connection", async (socket) => {
  console.log("connected user", socket.id);

  try {
    const token = socket.handshake.auth.token;
    const user = await getUserDetailsByToken(token);

    if (!user || !user._id) {
      console.log("Invalid user");
      return;
    }

    // Create the room
    socket.join(user._id.toString());
    onlineUsers.add(user._id.toString());

    io.emit("onlineUser", Array.from(onlineUsers));

    socket.on("message-page", async (userId) => {
      try {
        const user = await userModel.findById(userId).select("-password");

        if (!user) {
          console.log("User not found");
          return;
        }

        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
          online: onlineUsers.has(userId),
          profile_pic: user.profile_pic,
        };

        socket.emit("message-user", payload);

        // previous message
    socket.emit('message',()=>{
          
    })


      } catch (error) {
        console.error("Error fetching message page user:", error);
      }
    });

    


    // Handle new message
    socket.on("new-message", async (data) => {
      try {
        // Check if conversation exists
        let conversation = await ConversationModel.findOne({
          $or: [
            { sender: data.sender, receiver: data.receiver },
            { sender: data.receiver, receiver: data.sender },
          ],
        });

        // If conversation does not exist, create a new one
        if (!conversation) {
          const createConversation = new ConversationModel({
            sender: data.sender,
            receiver: data.receiver,
          });
          conversation = await createConversation.save();
        }

        const message = new MessageModel({
          text: data.text,
          imageUrl: data.imageUrl,
          videoUrl: data.videoUrl,
          msgByUserId: data.msgByUserId,
        });

        const savedMessage = await message.save();

        await ConversationModel.updateOne(
          { _id: conversation._id },
          {
            $push: { messages: savedMessage._id },
          }
        );

        // Get all messages in the conversation
        const getConversation = await ConversationModel.findById(conversation._id)
          .populate("messages")
          .sort({ updatedAt: -1 });

        if (!getConversation) { 
          console.log("Conversation not found after message update");
          return;
        }

        io.to(data.sender).emit("message", getConversation.messages);
        io.to(data.receiver).emit("message", getConversation.messages);

      } catch (error) {
        console.error("Error handling new message:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      onlineUsers.delete(user._id.toString());
      console.log("disconnected user", socket.id);
      io.emit("onlineUser", Array.from(onlineUsers));
    });

  } catch (error) {
    console.error("Connection error:", error);
  }
});
