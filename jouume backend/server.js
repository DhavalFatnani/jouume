import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

console.log(PORT);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Jouume is Running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
