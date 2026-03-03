const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8081;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Webpack app listening on :${port}`);
});
