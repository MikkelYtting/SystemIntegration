// npm install express xml2js js-yaml csv-parser

const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const yaml = require('js-yaml');
const csv = require('csv-parser');
const app = express();
const PORT = 3000;

const parser = new xml2js.Parser();

app.get('/text', (req, res) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ Text: data });
  });
});

app.get('/xml', (req, res) => {
  fs.readFile('data.xml', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    parser.parseString(data, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
      }
      res.send({ XML: result });
    });
  });
});

app.get('/yaml', (req, res) => {
  try {
    const data = yaml.load(fs.readFileSync('data.yaml', 'utf8'));
    res.send({ YAML: data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.get('/json', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ JSON: JSON.parse(data) });
  });
});

app.get('/csv', (req, res) => {
  const results = [];
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.send({ CSV: results });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// se endpoints 
// http://localhost:3000/text 
// http://localhost:3000/xml
// http://localhost:3000/yaml 
// http://localhost:3000/json 
// http://localhost:3000/csv 
