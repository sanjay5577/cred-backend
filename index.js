// run `node index.js` in the terminal
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
