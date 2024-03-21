const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  const diagObj ={
    time: Date.now(),
    error_id:uuidv4(),
    errors:req.body.errors
  }
  console.log(req.body);
  console.log(diagObj);
  readAndAppend(diagObj, './db/diagnostics.json');
  res.send("success!")
  // TODO: Logic for appending data to the db/diagnostics.json file
});

module.exports = diagnostics;
