const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Mad Lib form submission route
server.post('/submit', (req, res) => {
  const { adjective, noun, verb, adverb, number } = req.body;

  if (!adjective || !noun || !verb || !adverb || !number) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out all fields.</p>
      <a href="index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `Today I saw a ${number} ${adjective} ${noun}s, and they all decided to ${verb} ${adverb}!`;
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="index.html">Go Back to Form</a>
  `);
});

// Determine the port to listen on
const port = process.argv[2] === 'local' ? 8080 : 80;

server.listen(port, () => console.log(`Ready on localhost:${port}!`));
