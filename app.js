const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Marketplace');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb://localhost:27017/Marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const productRoutes = require('./productRoutes');
app.use('/api', productRoutes);

