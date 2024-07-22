// Importerer nødvendige moduler
const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const yaml = require('js-yaml');
const csv = require('csv-parser');
const app = express();
const PORT = 3000;

const parser = new xml2js.Parser(); // Opretter XML-parser

// Endpoint for at læse og sende tekstfil
app.get('/text', (req, res) => {
  fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ Text: data }); // Sender tekstindhold (ingen parsing)
  });
});

// Endpoint for at læse og parse XML-fil
app.get('/xml', (req, res) => {
  fs.readFile('data.xml', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    parser.parseString(data, (error, result) => { // Parser XML til JavaScript-objekt
      if (error) {
        console.error(error);
        return res.status(500).send({ error: error.message });
      }
      res.send({ XML: result }); // Sender parset XML-indhold
    });
  });
});

// Endpoint for at læse og parse YAML-fil
app.get('/yaml', (req, res) => {
  try {
    const data = yaml.load(fs.readFileSync('data.yaml', 'utf8')); // Parser YAML til JavaScript-objekt
    res.send({ YAML: data }); // Sender parset YAML-indhold
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

// Endpoint for at læse og sende JSON-fil
app.get('/json', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ error: err.message });
    }
    res.send({ JSON: JSON.parse(data) }); // Parser JSON til JavaScript-objekt og sender
  });
});

// Endpoint for at læse og parse CSV-fil
app.get('/csv', (req, res) => {
  const results = [];
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data)) // Parser CSV rækker til JavaScript-objekter
    .on('end', () => {
      res.send({ CSV: results }); // Sender parset CSV-indhold
    });
});

// Starter serveren
app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));
