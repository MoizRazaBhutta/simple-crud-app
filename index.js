const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// MongoDB connection setup
mongoose.connect('mongodb+srv://moizraza10_db_user:gZ3bHUqyvwDfDC4L@firstmongodb.0d8xzxb.mongodb.net/?appName=FirstMongoDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));