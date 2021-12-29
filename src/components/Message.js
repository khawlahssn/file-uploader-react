import React, {useState} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Message = ({ msg }) => {
  const [close, setClose] = useState(false);
  const handleClick = () => {
      setClose(true);
  }

  return (
    close ? null : (<div className='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}
      <button type="button" class="btn-close" aria-label="Close" onClick={handleClick}></button>
    </div>)
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;