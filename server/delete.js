const mongoose = require('mongoose');
const Interviewee = require('./models/interviewee');
const connect = require('./config/connect');

// Improved script for standalone execution
async function deleteAllInterviewees() {
  try {
    // Connect to the database
    await connect();

    // Delete all documents in the Interviewee collection
    await Interviewee.deleteMany();

    console.log('Deleted all the interviewees');

    // Disconnect from the database
    await mongoose.disconnect();

    console.log('Database connection closed.');
  } catch (error) {
    console.error('An error occurred:', error);

    // Ensure the database connection is closed in case of error
    await mongoose.disconnect();
  }
}

deleteAllInterviewees();
