const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://yourhealthfirst31_db_user:hC9iRhG2TK8dKIu6@cluster0.p8fh2rj.mongodb.net/vitalis?retryWrites=true&w=majority&appName=Cluster0";
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
