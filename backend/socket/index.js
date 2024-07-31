import express from "express";
import { Server } from "socket.io";
import http from "http";
import { getUserDetailsByToken } from "../helper/getUserDetailsByToken.js";
import userModel from "../models/UserModel.js";

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
  socket.join(user?._id);
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

  //disconnetct
  socket.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("disconnected user", socket.id);
  });
});
