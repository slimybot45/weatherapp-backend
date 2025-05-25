const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/store-coords', (req, res) => {
  const { latitude, longitude } = req.body;
  const logEntry = `${new Date().toISOString()}, ${latitude}, ${longitude}\n`;
  fs.appendFile('coordinates.txt', logEntry, err => {
    if (err) return res.status(500).send('Failed to store');
    res.send('Stored!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/show-coords', (req, res) => {
  const file = 'coordinates.txt';
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, 'utf-8');
    res.send(`<pre>${data}</pre>`);
  } else {
    res.send('No coordinates stored yet.');
  }
});

