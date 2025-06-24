const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB(); // ✅ ensure DB is connected

    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // ✅ password will be hashed in schema
    });

    await admin.save();
    console.log('Dummy admin created:', admin);
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
