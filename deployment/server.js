const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Import the main server logic
const mainServer = require('./server/index.js');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', mainServer);

// Catch all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 ztupid gen running on port ${PORT}`);
});
