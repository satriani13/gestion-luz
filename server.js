'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3007;
const STATE_FILE = path.join(__dirname, 'state.json');

app.use(express.json());
app.use(express.static(__dirname));

app.get('/api/state', (req, res) => {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return res.json(JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')));
    }
  } catch {}
  res.json({});
});

app.post('/api/state', (req, res) => {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`gestion-luz on :${PORT}`));
