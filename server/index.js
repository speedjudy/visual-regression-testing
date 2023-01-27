/**
 *
 * Author:  George Simos - georgesimos.com
 *
 * License: Copyright (c) 2019 George Simos
 * @link https://github.com/georgesimos/nodejs-starter
 *
 */

const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');
const routes = require('./routes');
var cors = require('cors');
const { exec } = require("child_process");
var fs = require('fs');




// Make all variables from our .env file available in our process
dotenv.config({ path: '.env.example' });

// Init express server
const app = express();

console.log(__dirname + '/backstop_data')
app.use(express.static(__dirname + '/backstop_data'));

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Middlewares & configs setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');
app.use(expressStatusMonitor());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Here we define the api routes
app.use(routes);

const port = process.env.PORT || 8080;
const address = process.env.SERVER_ADDRESS || 'localhost';

app.post('/test', (req, res) => {
  console.log(req.body, 1);
  const fs = require('fs').promises

  const setValue = (fn, value) =>
    fs.readFile(fn)
      .then(body => JSON.parse(body))
      .then(json => {
        // manipulate your data here
        json.scenarios[0].url = value.url
        json.scenarios[0].referenceUrl = value.referUrl
        return json
      })
      .then(json => JSON.stringify(json))
      .then(body => fs.writeFile(fn, body))
      .catch(error => console.warn(error))
  const setPValue = (fn, value) =>
    fs.readFile(fn)
      .then(body => JSON.parse(body))
      .then(json => {
        // manipulate your data here
        json.scripts['backstop:test'] = "start-server-and-test start " + value.url + " visual-test"
        return json
      })
      .then(json => JSON.stringify(json))
      .then(body => fs.writeFile(fn, body))
      .catch(error => console.warn(error))
  setValue('backstop.json', req.body)
  setPValue('package.json', req.body)
  exec("backstop test", (error, stdout, stderr) => {
    // if (error) {
    //   console.log(`error: ${error.message}`);
    //   return;
    // }
    // if (stderr) {
    //   console.log(`stderr: ${stderr}`);
    //   return;
    // }
    // console.log(`stdout: ${stdout}`);
  });
  res.send(`http://${address}:${port}/html_report/index.html`);
});

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));
