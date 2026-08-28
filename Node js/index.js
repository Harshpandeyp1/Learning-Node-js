import express from "express";
import cors from "cors";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
db();

// Test route
app.get("/", (req, res) => {
  res.send("Node.js server is running!");
});

// Example static API (not tied to DB/controller)
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Harsh" },
    { id: 2, name: "Rahul" },
  ]);
});

// Mount user routes
app.use("/", userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});