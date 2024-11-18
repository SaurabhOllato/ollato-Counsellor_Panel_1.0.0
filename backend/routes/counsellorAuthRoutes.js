const express = require("express");
const {
  uploadCounsellorDocuments,
} = require("../controllers/uploadCounsellorDocumentsController");

const router = express.Router();

router.post("/upload-documents", uploadCounsellorDocuments);

module.exports = router;
