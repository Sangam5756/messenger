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
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connected user", socket.id);

  const token = socket.handshake.auth.token;
  const user = await getUserDetailsByToken(token);

  // create the room
  socket.join(user?._id.toString());
  onlineUser.add(user?._id.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("message-page", async (userId) => {
    const user = await userModel.findById(userId).select("-password");

    const payload = {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      online: onlineUser.has(userId),
      profile_pic: user?.profile_pic,
    };

    socket.emit("message-user", payload);
  });

  // message
  socket.on("new-message", async (data) => {
    // check conversation available both user

    let conversation = await ConversationModel.findOne({
      $or: [{ sender: data?.sender, receiver: data?.receiver }],
      $or: [{ sender: data?.receiver, receiver: data?.sender }],
    });

    // if conversation not available
    if (!conversation) {
      const createConversation = await ConversationModel({
        sender: data?.sender,
        receiver: data?.receiver,
      });
      conversation = await createConversation.save();
    }

    const messages = await MessageModel({
      text: data?.text,
      imageUrl: data?.imageUrl,
      videoUrl: data?.videoUrl,
      msgByUserId: data?.msgByUserId,
    });

    const saveMessage = await messages.save();

    const updateConversation = await ConversationModel.updateOne(
      { _id: conversation._id },
      {
        $push: { messages: saveMessage._id },
      }
    );

    // get all message
    const getConversation = await ConversationModel.findOne({
      $or: [{ sender: data?.sender, receiver: data?.receiver }],
      $or: [{ sender: data?.receiver, receiver: data?.sender }],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    io.to(data?.sender).emit("message", getConversation.messages);
    io.to(data?.receiver).emit("message", getConversation.messages);
  });

  //disconnetct
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("disconnected user", socket.id);
  });
});
