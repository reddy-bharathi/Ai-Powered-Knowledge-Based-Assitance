import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  uploadDocument,
  getDocuments,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();

// Upload
router.post(
  "/",
  upload.single("document"),
  uploadDocument
);

// Get All
router.get("/", getDocuments);

// Delete
router.delete("/:id", deleteDocument);

export default router;