const Complaint = require('./models/Complaint');
const fs = require('fs');
const path = require('path');

exports.submitComplaint = async (req, res) => {
  try {
    const { message } = req.body;
    const studentId = req.user.id;
    const studentPhone = req.user.phoneNumber;

    if (!message) {
      return res.status(400).json({ message: 'Complaint message required' });
    }

    const proofImages = [];
    if (req.files) {
      req.files.forEach(file => {
        proofImages.push({
          filename: file.filename,
          path: `/uploads/${file.filename}`
        });
      });
    }

    const complaint = new Complaint({
      studentId,
      studentPhone,
      message,
      proofImages,
      status: 'pending'
    });

    await complaint.save();

    res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudentComplaints = async (req, res) => {
  try {
    const studentId = req.user.id;
    const complaints = await Complaint.find({ studentId });

    res.json({
      message: 'Student complaints retrieved',
      complaints
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('studentId', 'name phoneNumber email');
    res.json({
      message: 'All complaints retrieved',
      complaints
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, severity, adminNotes } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status, severity, adminNotes, updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      message: 'Complaint updated successfully',
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComplaintDetails = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId).populate('studentId', 'name phoneNumber email');

    res.json({
      message: 'Complaint details retrieved',
      complaint
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
