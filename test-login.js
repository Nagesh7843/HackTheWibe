const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');

async function testLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if student exists
    const student = await Student.findOne({ phoneNumber: '9876543210' });
    console.log('📍 Student found:', student ? 'Yes' : 'No');

    if (student) {
      console.log('📝 Student details:', {
        phoneNumber: student.phoneNumber,
        name: student.name,
        email: student.email,
        passwordHash: student.password.substring(0, 20) + '...'
      });

      // Test password comparison
      const isPasswordValid = await student.comparePassword('student123');
      console.log('🔐 Password match:', isPasswordValid ? 'Yes' : 'No');

      if (!isPasswordValid) {
        console.log('❌ Password does not match. Trying to update password...');
        student.password = 'student123';
        await student.save();
        console.log('✅ Password updated');

        // Test again
        const isNewPasswordValid = await student.comparePassword('student123');
        console.log('🔐 New password match:', isNewPasswordValid ? 'Yes' : 'No');
      }
    } else {
      console.log('⚠️  Student not found. Creating new test student...');
      const newStudent = new Student({
        phoneNumber: '9876543210',
        password: 'student123',
        name: 'Test Student',
        email: 'student@test.com'
      });
      await newStudent.save();
      console.log('✅ Test student created');

      // Verify
      const testStudent = await Student.findOne({ phoneNumber: '9876543210' });
      const isValid = await testStudent.comparePassword('student123');
      console.log('🔐 Test student password validation:', isValid ? 'Yes' : 'No');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testLogin();
