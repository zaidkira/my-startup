const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://zaidden123_db_user:gZnguWERSMyOlahp@mystarup.t3s3std.mongodb.net/vitalis?retryWrites=true&w=majority&appName=myStarup";
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
