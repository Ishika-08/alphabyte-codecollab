
const mongoose = require('mongoose');

const intervieweeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  phoneNumber: String,
  createdAt: { type: Date, default: Date.now },
});

const Interviewee = mongoose.model('Interviewee', intervieweeSchema);

module.exports = Interviewee;
