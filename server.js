const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Serving static files
const staticFilesPath = path.join(__dirname, 'public');
app.use(express.static(staticFilesPath));

// Random number generator route
app.get('/generate_random', (req, res) => {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  res.send(`Your random number is: ${randomNum}`);
});

// Mad Lib form submission handler
app.post('/submit', (req, res) => {
  const { adjective, noun, verb, adverb, number } = req.body;

  // Check if all fields are filled
  if (!adjective || !noun || !verb || !adverb || !number) {
    res.send(`
      <h1>Submission Incomplete</h1>
      <p>Please ensure all fields are filled out correctly.</p>
      <a href="/ITC505/lab-7/index.html">Return to Form</a>
    `);
    return;
  }

  // Generate the Mad Lib story
  const madLibStory = `Today I saw a ${number} ${adjective} ${noun}s, and they all decided to ${verb} ${adverb}!`;

  // Send the success page with the generated Mad Lib
  res.send(`
    <h1>Mad Lib Completed!</h1>
    <p>${madLibStory}</p>
    <a href="/ITC505/lab-7/index.html">Back to Form</a>
  `);
});

// Choose the appropriate port based on the environment
const port = process.argv[2] === 'local' ? 8080 : 80;

app.listen(port, () => console.log(`Server is running on localhost:${port}`));
