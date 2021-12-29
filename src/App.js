import axios from 'axios';
import { useState } from 'react';
import Message from './components/Message';
import './App.css';

function App() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
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

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <div className="App">
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='file'
            onChange={onChange}
          />
          <label>
            {filename}
          </label>
        </div>

        <input
          type='submit'
          value='Upload'
        />
      </form>
      {uploadedFile ? (
        <div>
            <h3> {uploadedFile.fileName} </h3>
        </div>
      ) : null}
    </div>
  );
}

export default App;
