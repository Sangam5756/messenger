import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbcon from "./config/dbconnect.js";
import router from "./routes/index.js";
import { app, server } from "./socket/index.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
// const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// api endpoints
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("root calling");
});

server.listen(PORT, () => {
  console.log(`server is running at http:localhost:${PORT}`);
  dbcon();
});
