const express = require('express');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const Interviewee = require('./models/interviewee');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const connectDb = require('./config/connect');
connectDb();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000", 'http://localhost:5173']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const upload = multer({ storage: multer.memoryStorage() });

const EditorRoutes = require('./routes/EditorRoutes');
app.use('/editor', EditorRoutes);

const emailTransporter = nodemailer.createTransport({
  host: 'smtp.mailchimp.com', 
  port: 587,
  secure: false, 
  auth: {
    user: 'mohitpardeshi729@gmail.com', 
    pass: '8de7f6ff3a0efbe780a07bea67155f6a-us18'  
  }
});

app.post('/send-email', async (req, res) => {
  const { email, meetingHash } = req.body;
  try {
    const info = await emailTransporter.sendMail({
      from: '"Your Company Name" <your-email@example.com>', // Replace with your sender email address
      to: email, // Recipient email address
      subject: "Interview Room Details", // Email subject
      text: `Here is your interview room hash: ${meetingHash}`, // Plain text body
      html: `<p>Here is your interview room hash: <strong>${meetingHash}</strong></p>` // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).send({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send({ message: 'Failed to send email.', error: error.message });
  }
});

// Upload endpoint
app.post('/upload/:interviewerId', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const intervieweesData = data.map(item => ({
      interviewerId: req.params.interviewerId,
      name: item['Name'],
      email: item['Email'],
      phoneNumber: item['Phone Number'],
    }));

    await Interviewee.insertMany(intervieweesData);
    res.status(200).send({
      message: 'File uploaded successfully!',
      data: intervieweesData // Sending back the uploaded data
    });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).send({
      message: 'Error uploading file.',
      error: error.message,
    });
  }
});

// Interviewees retrieval endpoint
app.get('/interviewees/:interviewerId', async (req, res) => {
  const interviewerId = req.params.interviewerId;
  try {
    const interviewees = await Interviewee.find({ interviewerId });
    res.json(interviewees);
  } catch (error) {
    console.error('Failed to retrieve interviewees:', error);
    res.status(500).send('Error retrieving interviewee data.');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
