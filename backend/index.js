import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "",
    method: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello ");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database || Running"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5554;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
