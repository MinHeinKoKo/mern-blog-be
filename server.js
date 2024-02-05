import express from "express";
import dotenv from "dotenv";
import path from "path"
import cors from "cors"
import connectDB from "./config/db";
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";

//Routes
import userRoutes from "./routes/userRoutes"
import postRoutes from "./routes/postRoutes"
import commentRoutes from './routes/commentRoutes'

dotenv.config();
connectDB()
const app = express();

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:4000', 'http://localhost:3500'];

const corsOptions = {
  origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comments",commentRoutes)

//static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(invalidPathHandler)
app.use(errorResponseHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
