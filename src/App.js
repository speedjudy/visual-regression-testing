import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import editJsonFile from 'edit-json-file';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <div className="container w-50">
        <h1>Backstop visual regression testing</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Reference Url</Form.Label>
            <Form.Control type="email" placeholder="Enter reference url" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Test Url</Form.Label>
            <Form.Control type="password" placeholder="Enter test url" />
          </Form.Group>
          <Button variant="primary">
            Test
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
