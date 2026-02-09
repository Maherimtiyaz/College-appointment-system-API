const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
       await mongoose.connect(ProcessingInstruction.env.DATABASE_URL, {
          userNewUrlParser: true,
          useUnifiedTopology: true,
       });
       console.log("MongoDB connected successfully");
    }  catch (err) {
       console.error("MongoDB connection error:", err.message);
       process.exit(1);
    }
};

module.export = connectDB