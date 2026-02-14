const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { authMiddleware, adminMiddleware } = require('../auth');
const {
  submitComplaint,
  getStudentComplaints,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintDetails
} = require('../complaintController');

const router = express.Router();
const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${unique}-${safeName}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }
  cb(new Error('Only image uploads are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { files: 5, fileSize: 5 * 1024 * 1024 }
});

router.post('/submit', authMiddleware, upload.array('proofImages', 5), submitComplaint);
router.get('/my-complaints', authMiddleware, getStudentComplaints);
router.get('/all', authMiddleware, adminMiddleware, getAllComplaints);
router.get('/:complaintId', authMiddleware, adminMiddleware, getComplaintDetails);
router.put('/:complaintId', authMiddleware, adminMiddleware, updateComplaintStatus);

module.exports = router;
