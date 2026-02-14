const mongoose = require('mongoose');
require('dotenv').config();

const Student = require('./models/Student');
const Admin = require('./models/Admin');
const Complaint = require('./models/Complaint');

async function clearAllUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear Students
    const deletedStudents = await Student.deleteMany({});
    console.log(`🗑️  Deleted ${deletedStudents.deletedCount} student(s)`);

    // Clear Admins
    const deletedAdmins = await Admin.deleteMany({});
    console.log(`🗑️  Deleted ${deletedAdmins.deletedCount} admin(s)`);

    // Clear Complaints
    const deletedComplaints = await Complaint.deleteMany({});
    console.log(`🗑️  Deleted ${deletedComplaints.deletedCount} complaint(s)`);

    console.log('\n✅ All users and complaints have been cleared!');
    console.log('📊 Database is now clean and ready for fresh data');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    process.exit(1);
  }
}

console.log('🔄 Starting database cleanup...\n');
clearAllUsers();
