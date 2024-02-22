const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

let votes = {};

app.get('/votes', (req, res) => {
  res.json(votes);
});

app.post('/vote', (req, res) => {
  const { candidate } = req.body;
  if (!candidate) {
    return res.status(400).send('Candidate name is required');
  }

  if (!votes[candidate]) {
    votes[candidate] = 0;
  }

  votes[candidate] += 1;
  res.send(`Vote for ${candidate} registered successfully!`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
