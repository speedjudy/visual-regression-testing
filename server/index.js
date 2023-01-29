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
  if (req.body) {
    const fs = require('fs').promises
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
      setTimeout(() => {
        exec("backstop test", (error, stdout, stderr) => { });
      }, 10000);
    });
  }, 1000);
  let confirmExist = setInterval(() => {
    fs.exists('backstop_data/html_report/index.html', function (isExist) {
      if (isExist) {
        console.log("exists:");
        clearInterval(confirmExist);
    
        var data = fs.readFileSync('backstop_data/html_report/index.html', 'utf-8');
        fs.unlinkSync('backstop_data/html_report/index.html')
        var newValue = data.replace(/\<title\>BackstopJS Report<\/title\>/, '<title>Test report</title> <link rel="stylesheet" href="index.css">');
        var newValue2 = newValue.replace(/\<script src\="index_bundle\.js"\>\<\/script\>/, '<script type="application/javascript" src="index_bundle.js"> </script><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script><script src="index.js"></script>');
        
        fs.writeFileSync('backstop_data/html_report/test.html', newValue2, 'utf-8');
    
        fs.writeFileSync('backstop_data/html_report/index.css', '//', 'utf-8');
        fs.writeFileSync('backstop_data/html_report/index.js', '$(function(){\n // \n});', 'utf-8');
    
        //js file change.
        var jsFile = fs.readFileSync('backstop_data/html_report/index.js', 'utf-8');
        var jsFileChange = jsFile.replace(/\/\//, `
          var sep = $(".cWwxxx")[1].innerText.split(" ");
          \n
          $(".cWwxxx")[1].innerText = sep[0] + " Unchanged";\nvar sep1 = $(".cWwxxx")[0].innerText.split(" ");
          \n
          $(".cWwxxx")[0].innerText = sep1[0] + " Changed";\n $(".sc-bxivhb h1").text(" Report Result"); 
          if ($(".sc-bZQynM").children().length==1) {
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="phone_svg" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16"> <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/> <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg></div>');
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="tablet_svg" fill="currentColor" class="bi bi-tablet-landscape" viewBox="0 0 16 16"> <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm-1 8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8z"/> <path d="M14 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/> </svg>');
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="desktop_svg" viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>');
          }
          var responsive_flag = 'all';
          let test_section = $(".sc-gPEVay").children();
          setTimeout(()=>{
            for (var i=0;i<test_section.length; i++) {
              var test = test_section[i];
              var type_text = $(test).find(".sc-hMqMXs")[2];
              $(type_text).hide()
              console.log(type_text)
            }
          },50);
          $('.sc-bZQynM div svg').click(function(){
            $('.'+responsive_flag).attr('width', 25);
            $('.'+responsive_flag).attr('height', 25);
    
            responsive_flag = $(this).attr('class');
    
            $('.'+responsive_flag).attr('width', 34);
            $('.'+responsive_flag).attr('height', 34);
    
            
            for (var i=0;i<test_section.length; i++) {
              var test = test_section[i];
              var type_text = $(test).find(".sc-kEYyzF");
              var t_t = type_text[2].innerText.split("_");
              var device_type = t_t[t_t.length-1].split('.')[0] + '_svg';
              if (responsive_flag == 'all') {
                $(test).show();
              } else if (responsive_flag == device_type) {
                $(test).show();
              } else {
                $(test).hide();
              }
              console.log(device_type)
            }
          });
        `);
        fs.writeFileSync('backstop_data/html_report/index.js', jsFileChange, 'utf-8');
    
        //js file change.
        var cssFile = fs.readFileSync('backstop_data/html_report/index.css', 'utf-8');
        var cssFileChange = cssFile.replace(/\/\//, `.sc-bZQynM {\n width:75%; \n} \n .sc-EHOje {\n height:35px !important; \n} \n .sc-dnqmqq{height:35px !important;} .sc-gzVnrw {height:35px !important;} \n .sc-bxivhb a {display:none;}
          .sc-bZQynM div { margin-left:10px; }
          .sc-bZQynM div svg { cursor: pointer; }
        `);
        fs.writeFileSync('backstop_data/html_report/index.css', cssFileChange, 'utf-8');
    
    
        // sc-bZQynM 
        console.log('readFileSync complete');
        res.send(`complete`);
      } else {
        console.log("DOES NOT exist:");
      }
    });
  }, 10);

  
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
