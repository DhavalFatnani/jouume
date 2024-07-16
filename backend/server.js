import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import JournalRouter from "./routes/journalRoutes";
import AuthRouter from "./routes/authRoutes";
import UserRouter from "./routes/userRoutes";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAILED");
    console.error("Error connecting to the database: ", error.message);
    // Exit process with failure code
    process.exit(1);
  }
}

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Jouume Backend");
});

app.use("/api/journals", JournalRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
