const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const router = Router();
const imageProcessor = require("./imageProcessor");

const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html");

const storage = multer.diskStorage({
  destination: "api/uploads/",
  filename: filename,
});

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

function filename(request, file, callback) {
  callback(null, file.originalname);
}

function fileFilter(request, file, callback) {
  if (file.mimetype !== "image/png") {
    request.fileValidationError = "Wrong file type";
    callback(null, false, new Error("Wrong file type"));
  } else {
    callback(null, true);
  }
}

router.get("/photo-viewer", (request, response) => {
  response.sendFile(photoPath);
});

router.post("/upload", upload.single("photo"), async (request, response) => {
  if (request.fileValidationError) return response.status(400).json({error: request.fileValidationError});

  try {
    await imageProcessor(request.file.filename);
  } catch (error) {

  }

  return response.status(201).json({success: true});
});

module.exports = router;
