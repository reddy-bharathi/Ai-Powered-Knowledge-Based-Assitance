import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});

const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "text/markdown",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, TXT and Markdown files are allowed."));
  }

};

const upload = multer({

  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter,

});

export default upload;