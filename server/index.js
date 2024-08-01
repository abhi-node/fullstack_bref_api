const path = require('path');
const cors = require('cors');
const express = require('express');
const scrapeData = require('./scraper');

app = express()

app.use(cors());
app.use(express.json());
// // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/dev')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  console.log('test')
  res.json({ message: "Hello from server!" });
});

app.get("/api/post", async (req, res) => {
  const name = req.query.name;
  console.log('Received name:', name);
  try {
    const final_player = await scrapeData(name);
    res.json(final_player);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ message: 'Error scraping data', error: error.toString() });
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});