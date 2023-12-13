const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 8080;
app.use(express.json());
app.get('/readFile', async (req, res) => {
  try {
    const content = await fs.readFile('TextfileTest.txt', 'utf-8');
    res.status(200).send(content);
  } catch (error) {
    res.status(404).send({ error: 'File not found' });
  }
});
app.post('/writeFile', async (req, res) => {
  const data = req.body.data;

  if (!data) {
    return res.status(400).send({ error: 'No data provided in the request body' });
  }

  try {
    await fs.writeFile('TextfileTest.txt', data, 'utf-8');
    res.status(201).send({ message: 'File written successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.put('/updateFile', async (req, res) => {
  const newData = req.body.data;

  if (!newData) {
    return res.status(400).send({ error: 'No new data provided in the request body' });
  }

  try {
    let existingContent = await fs.readFile('TextfileTest.txt', 'utf-8');
    existingContent += '\n' + newData;
    await fs.writeFile('TextfileTest.txt', existingContent, 'utf-8');

    res.status(200).send({ message: 'File updated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
