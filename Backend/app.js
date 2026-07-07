import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folder for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
    "/api/chat",
    chatRoutes
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("✅ AI Knowledge Base Assistant API Running...");
});

export default app;