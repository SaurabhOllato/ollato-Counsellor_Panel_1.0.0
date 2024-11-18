const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../config/db"); // Ensure correct path to the db

// // Set up storage engine for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Create folders for uploads if they don't exist
//     const uploadFolder = path.join(__dirname, "../uploads");
//     console.log(`Checking if upload folder exists at ${uploadFolder}`);
//     if (!fs.existsSync(uploadFolder)) {
//       console.log(`Creating upload folder at ${uploadFolder}`);
//       fs.mkdirSync(uploadFolder);
//     }

//     const fileTypeFolder = path.join(uploadFolder, file.fieldname);
//     console.log(`Checking if fileType folder exists at ${fileTypeFolder}`);
//     if (!fs.existsSync(fileTypeFolder)) {
//       console.log(`Creating file type folder at ${fileTypeFolder}`);
//       fs.mkdirSync(fileTypeFolder);
//     }

//     cb(null, fileTypeFolder); // Specify destination folder for each file
//   },
//   filename: (req, file, cb) => {
//     // Use original name with a timestamp to avoid name conflicts
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const fileName =
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
//     console.log(`Saving file as ${fileName}`);
//     cb(null, fileName);
//   },
// });

// // Multer middleware for file uploads
// const upload = multer({ storage: storage }).fields([
//   { name: "profile_pic", maxCount: 1 },
//   { name: "degree_certificate", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
//   { name: "aadhar_card_front", maxCount: 1 },
//   { name: "aadhar_card_back", maxCount: 1 },
//   { name: "pan_card", maxCount: 1 },
//   { name: "signature", maxCount: 1 },
// ]);

console.log(path.resolve("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create folders for uploads if they don't exist
    const uploadFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    const fileTypeFolder = path.join(uploadFolder, file.fieldname);
    if (!fs.existsSync(fileTypeFolder)) {
      fs.mkdirSync(fileTypeFolder);
    }

    cb(null, fileTypeFolder); // Specify destination folder for each file
  },
  filename: (req, file, cb) => {
    // Use original name with a timestamp to avoid name conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Add a file filter to allow only .pdf files and other desired formats
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf/; // Allow JPEG, JPG, PNG, PDF
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept the file
  } else {
    cb(new Error("Only images and PDFs are allowed"));
  }
};

// Multer middleware for file uploads, now with fileFilter
const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: "profile_pic", maxCount: 1 },
  { name: "degree_certificate", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "aadhar_card_front", maxCount: 1 },
  { name: "aadhar_card_back", maxCount: 1 },
  { name: "pan_card", maxCount: 1 },
  { name: "signature", maxCount: 1 },
]);
console.log("This is path: ", path.resolve("uploads"));

// Controller to handle file uploads and saving to database
const uploadCounsellorDocuments = async (req, res) => {
  console.log("Starting document upload process...");

  try {
    // Ensure files are uploaded using Multer
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          console.error(`Multer error: ${err.message}`);
          reject(new Error(`Multer error: ${err.message}`));
        } else if (err) {
          console.error(`Server error: ${err.message}`);
          reject(new Error(`Server error: ${err.message}`));
        } else {
          console.log("File upload successful.");
          resolve();
        }
      });
    });

    // Extracting uploaded file paths
    const files = req.files;
    console.log("Files received:", files);
    const user_id = req.body.user_id;
    console.log(`Received user_id: ${user_id}`);

    // Set default to empty string if file is not uploaded
    const profile_pic = files.profile_pic
      ? `/uploads/profile_pic/${files.profile_pic[0].filename}`
      : "";
    const degree_certificate = files.degree_certificate
      ? `/uploads/degree_certificate/${files.degree_certificate[0].filename}`
      : "";
    const resume = files.resume
      ? `/uploads/resume/${files.resume[0].filename}`
      : "";
    const aadhar_card_front = files.aadhar_card_front
      ? `/uploads/aadhar_card_front/${files.aadhar_card_front[0].filename}`
      : "";
    const aadhar_card_back = files.aadhar_card_back
      ? `/uploads/aadhar_card_back/${files.aadhar_card_back[0].filename}`
      : "";
    const pan_card = files.pan_card
      ? `/uploads/pan_card/${files.pan_card[0].filename}`
      : "";
    const signature = files.signature
      ? `/uploads/signature/${files.signature[0].filename}`
      : "";

    console.log("File paths set for upload:", {
      profile_pic,
      degree_certificate,
      resume,
      aadhar_card_front,
      aadhar_card_back,
      pan_card,
      signature,
    });

    // Storing document details into the database
    const query = `
      INSERT INTO documents_details 
      (user_id, profile_pic, degree_certificate, resume, aadhar_number, aadhar_card_front, aadhar_card_back, pan_number, pan_card, signature, professional_expertise)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Get other fields from the body (fields user fills)
    const aadhar_number = req.body.aadhar_number;
    const pan_number = req.body.pan_number;
    const professional_expertise = req.body.professional_expertise;

    console.log("Inserting document details into the database...");

    // Execute the query to insert the document details using the promise API
    const [result] = await db.query(query, [
      user_id,
      profile_pic,
      degree_certificate,
      resume,
      aadhar_number,
      aadhar_card_front,
      aadhar_card_back,
      pan_number,
      pan_card,
      signature,
      professional_expertise,
    ]);

    console.log("Database insertion result:", result);

    res.status(200).json({
      message: "Documents uploaded successfully",
      data: result, // Ensure you're returning the result correctly
    });
  } catch (err) {
    console.error("Error during document upload:", err.message); // Log the error
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

module.exports = { uploadCounsellorDocuments };
