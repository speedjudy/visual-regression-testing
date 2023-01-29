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
const { exec, spawn } = require("child_process");
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
  if (req.body) {
    const setValue = (fn, value) =>
      fs.readFile(fn)
        .then(body => JSON.parse(body))
        .then(json => {
          // manipulate your data here
          let scenariosAry = [];
          console.log(value.pages);
          for (let i = 0; i < value.pages.length; i++) {
            let scenariosObj = {
              "label": value.pages[i],
              "cookiePath": "backstop_data/engine_scripts/cookies.json",
              "url": value.url + value.pages[i],
              "referenceUrl": value.referUrl + value.pages[i],
              "readyEvent": "",
              "readySelector": "",
              "delay": 0,
              "hideSelectors": [],
              "removeSelectors": [],
              "hoverSelector": "",
              "clickSelector": "",
              "postInteractionWait": 0,
              "selectors": [],
              "selectorExpansion": true,
              "expect": 0,
              "misMatchThreshold": 0.1,
              "requireSameDimensions": true
            }
            scenariosAry.push(scenariosObj);
          }
          json.scenarios = scenariosAry
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
  }
  setTimeout(() => {
    exec("backstop reference", (error, stdout, stderr) => {
      setTimeout(()=>{
        exec("backstop test", (error, stdout, stderr) => {});
      }, 30000);
    });
  }, 1000);

  res.send(`http://${address}:${port}/html_report/index.html`);
});
app.get('/clear', (req, res) => {
  if (fs.existsSync('backstop_data')) {
    fs.rmdir('backstop_data', { recursive: true }, err => {
      if (err) {
        throw err
      }

      console.log(`Folder is deleted!`)
    })
  }
});

app.listen(port, () => console.log(`Server running on http://${address}:${port}`));
