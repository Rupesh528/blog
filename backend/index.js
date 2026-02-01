/**
 * Main server entry file
 * Uses ES Module syntax because project is configured as "type": "module"
 */

import "./config.js"; // Load environment variables first
import express from "express";
import cors from "cors";
import rootrouter from "./routes/account.js";  
import blogrouter from "./routes/blog.js";  


const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/v1/user", rootrouter);

app.use('/api/v1/blog', blogrouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Medium Backend API" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
