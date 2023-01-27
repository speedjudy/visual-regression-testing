import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [referUrl, setReferUrl] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [load, setLoad] = useState(false);
  const onChangeReferURL = (url) => {
    setReferUrl(url);
  }
  const onChangeURL = (url) => {
    setUrl(url);
  }
  const handleTest = () => {
    setLoad(true);
    axios.post(`http://localhost:8080/test`, { url: url, referUrl: referUrl })
      .then(res => {
        console.log(res.data);
        setTimeout(() => {
          setResult(res.data);
          setLoad(false);
        }, 5000);
      })
  }
  const handleClear = () => {
    setUrl('1');
    setReferUrl('1');
    setResult('');
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
        <h1>Backstop visual regression testing</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Reference Url</Form.Label>
            <Form.Control onChange={(e) => { onChangeReferURL(e.target.value) }} type="text" placeholder="Enter reference url" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Test Url</Form.Label>
            <Form.Control onChange={(e) => { onChangeURL(e.target.value) }} type="text" placeholder="Enter test url" />
          </Form.Group>
          <Button variant="primary" onClick={() => handleTest()}>
            Test
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button variant="primary" onClick={() => handleClear()}>
            Clear
          </Button>
        </Form>
      </div>
      <hr />
      <iframe src={result} style={{ width: "100%", height: '900px' }} title="Iframe Example"></iframe>
    </div>
  );
}

export default App;
