import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Papa from "papaparse";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// Allowed extensions for input file
const allowedExtensions = ["csv"];

function App() {
  const [referUrl, setReferUrl] = useState("");
  const [url, setUrl] = useState("");
  const [pages, setPages] = useState("");
  const [result, setResult] = useState("");
  const [step, setStep] = useState(1);
  const [load, setLoad] = useState(false);

  // This state will store the parsed data
  const [data, setData] = useState([]);

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };
  const handleParse = () => {

    // If user clicks the parse button without
    // a file we show a error
    if (!file) return setError("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData);
      setPages(target.result);
      
      setData(columns);
    };
    reader.readAsText(file);
  };

  const onChangeReferURL = (url) => {
    setReferUrl(url);
  }
  const onChangeURL = (url) => {
    setUrl(url);
  }
  const onChangePages = (url) => {
    setPages(url);
    console.log(pages);
  }
  const handleTest = () => {
    setLoad(true);
    axios.post(`http://localhost:8080/test`, { url: url, referUrl: referUrl, pages: pages.split("\n") })
      .then(res => {
        console.log(res.data);
        if (res.data == "complete") {
          setLoad(false);
          setResult('http://localhost:8080/html_report/test.html');
        }
      })
  }
  const handleClear = () => {
    setResult('');
    axios.get(`http://localhost:8080/clear`)
      .then(res => {
        window.location.reload();
      })
  }
  const handleNext = () => {
    setStep(step + 1);
  }
  const handlePrevious = () => {
    setStep(step - 1);
  }
  return (
    <div className="App">
      {
        load &&
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      }
      <div className="container w-50">
        {/* step 1 */}
        {
          step === 1 &&
          <div className='steps'>
            <h1>Step 1/3</h1>
            <h3>What are URLs of your environments?</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Reference Url</Form.Label>
                <Form.Control onChange={(e) => { onChangeReferURL(e.target.value) }} type="text" value={referUrl} placeholder="Enter reference url" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Test Url</Form.Label>
                <Form.Control onChange={(e) => { onChangeURL(e.target.value) }} type="text" value={url} placeholder="Enter test url" />
              </Form.Group>
            </Form>
          </div>
        }
        {/* step 2 */}
        {
          step === 2 &&
          <div className='steps'>
            <h1>Step 2/3</h1>
            <h3>Pages (enter pages without domain or upload csv file)</h3>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label></Form.Label>
                <Form.Control as="textarea" value={pages} onChange={(e) => { onChangePages(e.target.value) }} rows={5} />
              </Form.Group>
              <div>
                <label htmlFor="csvInput" style={{ display: "block" }}>
                  Enter CSV File
                </label>
                <input
                  onChange={handleFileChange}
                  id="csvInput"
                  name="file"
                  type="File"
                />
                <button type='button' onClick={handleParse}>Parse</button>
                {/* <div style={{ marginTop: "3rem" }}>
                  {error ? error : data.map((col,
                    idx) => <div key={idx}>{col}</div>)}
                </div> */}
              </div>
            </Form>
          </div>
        }
        {/* step 3 */}
        {
          step === 3 &&
          <div className='steps'>
            <h1>Step 3/3</h1>
            <h3>Report</h3>
            <ol>
              {pages.split("\n").map((col, idx) => 
                <li key={idx}><a href={url+col} target='_blank'>{url}{col}</a></li>
                )}
            </ol>
            <div>
              <Button variant="primary" onClick={() => handleTest()}>
                Test
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant="primary" onClick={() => handleClear()}>
                Clear
              </Button>
            </div>
          </div>
        }
        <br />
        <div className='float-left'>
          {
            step !== 1 &&
            <Button variant="primary" onClick={() => handlePrevious()}>
              Previous
            </Button>
          }
          {
            step === 1 &&
            <Button variant="primary" disabled onClick={() => handlePrevious()}>
              Previous
            </Button>
          }
          &nbsp;&nbsp;&nbsp;
          {
            step !== 3 &&
            <Button variant="primary" onClick={() => handleNext()}>
              Next
            </Button>
          }
          {
            step === 3 &&
            <Button variant="primary" disabled onClick={() => handleNext()}>
              Next
            </Button>
          }
        </div>
      </div>
      <br />

      <hr />
      {
        step === 3 &&
        <iframe src={result} style={{ width: "100%", height: '900px' }} title="Iframe Example"></iframe>
      }
    </div>
  );
}

export default App;
