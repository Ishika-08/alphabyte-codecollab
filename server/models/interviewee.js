const mongoose = require('mongoose');
const crypto = require('crypto');

const intervieweeSchema = new mongoose.Schema({
  userId: { type: String, default: () => crypto.randomUUID() }, 
  name: String,
  email: String,
  phoneNumber: String,
  interviewerId: String, 
  createdAt: { type: Date, default: Date.now },
});

const Interviewee = mongoose.model('Interviewee', intervieweeSchema);

module.exports = Interviewee;
