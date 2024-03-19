const PythonShell = require('python-shell').PythonShell;
const express = require('express');
const cors = require('cors');
const multer = require('multer'); 
const xlsx = require('xlsx');
const mongoose = require('mongoose'); 
const Interviewee = require('./models/interviewee'); 
const app = express();
const port = 3000;
// const { router } = require('./routes/RoomRoute');


app.use(cors())
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const EditorRoutes = require('./routes/EditorRoutes');

app.use('/editor', EditorRoutes);

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const intervieweesData = data.map(item => ({
            userId: req.body.userId, 
            name: item['Name'],
            email: item['Email'],
            phoneNumber: item['Phone Number'],
        }));

        await Interviewee.insertMany(intervieweesData);
        res.status(200).send('Data successfully uploaded and stored.');
    } catch (error) {
        console.error('Error processing file upload:', error);
        res.status(500).send('Error processing file upload.');
    }
});

// app.use('/', router);

app.get('/interviewees', async (req, res) => {
  const userId = req.body.userId;
  try {
    const interviewees = await Interviewee.find({ userId });
    res.json(interviewees);
  } catch (error) {
    console.error('Failed to retrieve interviewees:', error);
    res.status(500).send('Error retrieving interviewee data.');
  }
});


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
