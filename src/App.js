import axios from 'axios';
import { useState } from 'react';
import Message from './components/Message';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File...');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      'file',
      file
    );

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);

      console.log(res);

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded ✅');

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div className="App">
      <h1>Start Uploading Files! 📥</h1>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="upload-area">
          <input type="file" className="form-control item1" onChange={onChange} />
          <Button type="submit" variant="primary" className="upload-bttn item2">Upload</Button>{' '}
        </div>
      </form>
      {uploadedFile ? (
        <div>
          <h3> {filename} </h3>
        </div>
      ) : null}
    </div>
  );
}

export default App;
