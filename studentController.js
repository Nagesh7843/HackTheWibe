const Student = require('./models/Student');
const jwt = require('jsonwebtoken');

exports.registerStudent = async (req, res) => {
  try {
    const { phoneNumber, password, name, email } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password required' });
    }

    let student = await Student.findOne({ phoneNumber });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    student = new Student({ phoneNumber, password, name, email });
    await student.save();

    const token = jwt.sign(
      { id: student._id, phoneNumber: student.phoneNumber, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      student: { id: student._id, phoneNumber: student.phoneNumber, name: student.name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: 'Phone number and password required' });
    }

    const student = await Student.findOne({ phoneNumber });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student._id, phoneNumber: student.phoneNumber, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Student logged in successfully',
      token,
      student: { id: student._id, phoneNumber: student.phoneNumber, name: student.name }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
