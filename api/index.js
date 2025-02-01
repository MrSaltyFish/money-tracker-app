import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Transaction from "./models/Transaction.js";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json("test ok42");
});

app.post("/api/transaction", async (req, res) => {
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGO_URL);
  const { price, name, description, datetime } = req.body;
  const transac = await Transaction.create({
    price,
    name,
    description,
    datetime,
  });
  res.json(transac);
});

app.get("/api/transactions", async (req, res) => {
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGO_URL);

  console.log("/api/transactions accessed");

  const transactions = await Transaction.find();
  res.json(transactions);
});

// app.listen(4040, () => {
//   console.log("Server running on http://localhost:4040");
// });

export default app;
