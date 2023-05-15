const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Add middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Log mongo queries that are being run
mongoose.set('debug', true);

// Import routes
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
